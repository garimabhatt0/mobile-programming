import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Linking,
  Alert,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── DATA ────────────────────────────────────────────────────────────────────
const TOPICS = [
  {
    id: "choking",
    title: "Choking",
    title_np: "घाँटीमा अड्किनु",
    icon: "🫁",
    severity: "critical",
    steps: [
      'Ask loudly — "Are you choking?" If they cannot speak or breathe, act immediately.',
      "Lean them forward and give 5 firm back blows between the shoulder blades with your palm.",
      "Give 5 abdominal thrusts (Heimlich): stand behind them, push inward and upward just above the navel.",
      "Repeat back blows and thrusts until the object comes out or they can breathe.",
      "If they become unconscious, lay them down and call 102 immediately.",
    ],
    tip: "For infants under 1 year, use 5 back blows + 5 chest thrusts. Never do abdominal thrusts on babies.",
  },
  {
    id: "burns",
    title: "Burns",
    title_np: "जलेको",
    icon: "🔥",
    severity: "critical",
    steps: [
      "Cool the burn immediately — hold under cold (not ice) running water for 10–20 minutes.",
      "Remove jewelry or tight items near the burn before swelling starts.",
      "Cover loosely with a clean non-fluffy cloth or cling wrap. Do NOT use cotton wool.",
      "Do NOT apply toothpaste, butter, or oil — these trap heat and cause infection.",
      "For large or deep burns, call 102. Do not try to treat at home.",
    ],
    tip: "A burn larger than your palm, or on the face/hands/genitals, always needs hospital care.",
  },
  {
    id: "bleeding",
    title: "Severe Bleeding",
    title_np: "धेरै रगत बग्नु",
    icon: "🩸",
    severity: "critical",
    steps: [
      "Press firmly on the wound with a clean cloth or bandage. Do not remove it — add more cloth on top if blood soaks through.",
      "Keep steady pressure for at least 10 minutes without peeking.",
      "If possible, raise the injured body part above heart level.",
      "Do NOT use a tourniquet unless the bleeding is life-threatening and you cannot control it any other way.",
      "Call 102 for deep, spurting, or uncontrolled bleeding.",
    ],
    tip: "Wear gloves if available to protect yourself from bloodborne infections.",
  },
  {
    id: "fracture",
    title: "Broken Bone",
    title_np: "हड्डी भाँचिनु",
    icon: "🦴",
    severity: "urgent",
    steps: [
      "Keep the person still. Do not try to straighten the bone.",
      "Immobilize the injured area using a splint — a rolled newspaper, stick, or board tied with cloth.",
      "Tie the splint above and below the fracture, not on it.",
      "If skin is broken (open fracture), cover with a clean cloth. Do NOT push bone back in.",
      "Get to a hospital. Call 102 if the person cannot be moved safely.",
    ],
    tip: "Signs of a fracture: severe pain, swelling, deformity, inability to use the limb.",
  },
  {
    id: "snakebite",
    title: "Snake Bite",
    title_np: "सर्पले टोक्नु",
    icon: "🐍",
    severity: "critical",
    steps: [
      "Keep the person calm and as still as possible — movement speeds venom spread.",
      "Keep the bitten limb below heart level.",
      "Remove tight items (rings, watches, tight clothing) near the bite.",
      "Do NOT cut the wound, suck out venom, apply ice, or use a tourniquet.",
      "Note the time of the bite and describe the snake if possible. Rush to hospital immediately.",
    ],
    tip: "Most snakebite deaths in Nepal are preventable if treated within 2 hours. Speed matters.",
  },
  {
    id: "heartattack",
    title: "Heart Attack",
    title_np: "मुटुको दौरा",
    icon: "❤️",
    severity: "critical",
    steps: [
      "Call 102 immediately — do not drive them yourself unless no ambulance is available.",
      "Have the person sit or lie down in a comfortable position (often sitting up is easier to breathe).",
      "Loosen tight clothing around the neck and chest.",
      "If available and the person is not allergic, give one aspirin (325mg) to chew slowly — not swallow whole.",
      "If they stop breathing and have no pulse, begin CPR.",
    ],
    tip: "Symptoms: chest pain/pressure, pain in left arm or jaw, shortness of breath, sweating, nausea.",
  },
  {
    id: "cpr",
    title: "CPR",
    title_np: "सिपिआर",
    icon: "💪",
    severity: "critical",
    steps: [
      'Check if the person is responsive — tap their shoulder and shout "Are you okay?"',
      "Call 102 before starting CPR, or ask someone nearby to call.",
      "Place heel of your hand on the centre of the chest. Put your other hand on top, fingers interlocked.",
      'Push down hard and fast — 30 compressions, at least 5 cm deep, at a rate of 100–120 per minute (to the beat of "Stayin\' Alive").',
      "After 30 compressions, give 2 rescue breaths if trained. If not trained, continue chest compressions only.",
      "Keep going until help arrives or the person starts breathing.",
    ],
    tip: "Hands-only CPR is better than no CPR. Do not stop to rest unless you are completely exhausted.",
  },
  {
    id: "drowning",
    title: "Drowning",
    title_np: "डुब्नु",
    icon: "🌊",
    severity: "critical",
    steps: [
      "Do NOT jump into water unless you are a trained rescuer — you may drown too.",
      "Throw something that floats — rope, bottle, clothing — and pull them to shore.",
      "Once out of water, check if they are breathing.",
      "If not breathing, start CPR immediately — begin with 5 rescue breaths first, then 30 compressions.",
      "Even if they seem fine, take them to hospital — secondary drowning can happen hours later.",
    ],
    tip: "A drowning person often cannot shout for help. Watch for someone quietly struggling to stay afloat.",
  },
  {
    id: "seizure",
    title: "Seizure / Fits",
    title_np: "अनुहार लाग्नु",
    icon: "⚡",
    severity: "urgent",
    steps: [
      "Stay calm. Time the seizure on your phone.",
      "Clear the area of hard or sharp objects. Cushion their head with something soft.",
      "Do NOT hold them down or put anything in their mouth.",
      "After convulsions stop, turn them onto their side (recovery position) to prevent choking.",
      "Call 102 if: the seizure lasts more than 5 minutes, they do not wake up, or it is their first seizure.",
    ],
    tip: "Most seizures stop on their own within 1–3 minutes. Stay with the person until fully conscious.",
  },
  {
    id: "heatstroke",
    title: "Heat Stroke",
    title_np: "घामको ताप",
    icon: "☀️",
    severity: "urgent",
    steps: [
      "Move the person to a cool, shaded place immediately.",
      "Remove excess clothing. Fan them continuously.",
      "Apply cold wet cloths to neck, armpits, and groin — these cool blood quickly.",
      "Give cool water to drink if they are conscious and able to swallow.",
      "Call 102 — heat stroke can cause organ failure within minutes.",
    ],
    tip: "Heat stroke is different from heat exhaustion. If confused, not sweating, or unconscious — it is heat stroke. Act fast.",
  },
];

const SEVERITY_COLOR = { critical: "#E24B4A", urgent: "#EF9F27" };
const SEVERITY_BG = { critical: "#FCEBEB", urgent: "#FAEEDA" };
const SEVERITY_LABEL = { critical: "Critical", urgent: "Urgent" };

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function EmergencyBanner() {
  return (
    <TouchableOpacity
      style={styles.emergencyBanner}
      onPress={() => Linking.openURL("tel:102")}
      activeOpacity={0.8}
    >
      <Text style={styles.emergencyIcon}>📞</Text>
      <Text style={styles.emergencyText}>Call 102 — Nepal Ambulance</Text>
      <Text style={styles.emergencyArrow}>›</Text>
    </TouchableOpacity>
  );
}

// ─── SCREENS ─────────────────────────────────────────────────────────────────

function HomeScreen({ onSelect, bookmarks }) {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.appName}>Suraksha</Text>
          <Text style={styles.appTagline}>सुरक्षा • Emergency First Aid</Text>
        </View>
        <EmergencyBanner />
        <Text style={styles.sectionLabel}>Emergency Topics</Text>
        <View style={styles.grid}>
          {TOPICS.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={styles.topicCard}
              onPress={() => onSelect(topic)}
              activeOpacity={0.7}
            >
              <Text style={styles.topicIcon}>{topic.icon}</Text>
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.topicNepali}>{topic.title_np}</Text>
              <View
                style={[
                  styles.severityBadge,
                  { backgroundColor: SEVERITY_BG[topic.severity] },
                ]}
              >
                <Text
                  style={[
                    styles.severityText,
                    { color: SEVERITY_COLOR[topic.severity] },
                  ]}
                >
                  {SEVERITY_LABEL[topic.severity]}
                </Text>
              </View>
              {bookmarks.includes(topic.id) && (
                <Text style={styles.bookmarkDot}>🔖</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function SearchScreen({ onSelect }) {
  const [query, setQuery] = useState("");
  const results =
    query.length < 1
      ? TOPICS
      : TOPICS.filter(
          (t) =>
            t.title.toLowerCase().includes(query.toLowerCase()) ||
            t.title_np.includes(query) ||
            t.steps.some((s) => s.toLowerCase().includes(query.toLowerCase())),
        );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Search</Text>
      </View>
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search topics or symptoms..."
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {results.length === 0 ? (
          <Text style={styles.emptyText}>No results found.</Text>
        ) : (
          results.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={styles.listItem}
              onPress={() => onSelect(topic)}
              activeOpacity={0.7}
            >
              <Text style={styles.listIcon}>{topic.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.listTitle}>{topic.title}</Text>
                <Text style={styles.listNepali}>{topic.title_np}</Text>
              </View>
              <View
                style={[
                  styles.severityBadge,
                  { backgroundColor: SEVERITY_BG[topic.severity] },
                ]}
              >
                <Text
                  style={[
                    styles.severityText,
                    { color: SEVERITY_COLOR[topic.severity] },
                  ]}
                >
                  {SEVERITY_LABEL[topic.severity]}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailScreen({ topic, onBack, bookmarks, toggleBookmark }) {
  const isBookmarked = bookmarks.includes(topic.id);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleBookmark(topic.id)}
          style={styles.bookmarkBtn}
        >
          <Text style={styles.bookmarkBtnText}>
            {isBookmarked ? "🔖 Saved" : "🔖 Save"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 16 }}>
        <TouchableOpacity
          style={styles.emergencyBanner}
          onPress={() => Linking.openURL("tel:102")}
        >
          <Text style={styles.emergencyIcon}>📞</Text>
          <Text style={styles.emergencyText}>Call 102 — Nepal Ambulance</Text>
          <Text style={styles.emergencyArrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.detailTitleRow}>
          <Text style={styles.detailEmoji}>{topic.icon}</Text>
          <View>
            <Text style={styles.detailTitle}>{topic.title}</Text>
            <Text style={styles.detailNepali}>{topic.title_np}</Text>
          </View>
        </View>

        <View
          style={[
            styles.severityBanner,
            {
              backgroundColor: SEVERITY_BG[topic.severity],
              borderColor: SEVERITY_COLOR[topic.severity],
            },
          ]}
        >
          <Text
            style={[
              styles.severityBannerText,
              { color: SEVERITY_COLOR[topic.severity] },
            ]}
          >
            {topic.severity === "critical"
              ? "⚠️ Critical emergency — act immediately"
              : "⏱ Urgent — get medical help soon"}
          </Text>
        </View>

        <Text style={styles.stepsHeading}>Steps to follow</Text>
        {topic.steps.map((step, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>{i + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}

        {topic.tip && (
          <View style={styles.tipBox}>
            <Text style={styles.tipLabel}>💡 Tip</Text>
            <Text style={styles.tipText}>{topic.tip}</Text>
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function BookmarksScreen({ bookmarks, onSelect }) {
  const saved = TOPICS.filter((t) => bookmarks.includes(t.id));

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Saved</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {saved.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔖</Text>
            <Text style={styles.emptyTitle}>No saved topics yet</Text>
            <Text style={styles.emptyDesc}>
              Open any topic and tap Save to add it here for quick access.
            </Text>
          </View>
        ) : (
          saved.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={styles.listItem}
              onPress={() => onSelect(topic)}
              activeOpacity={0.7}
            >
              <Text style={styles.listIcon}>{topic.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.listTitle}>{topic.title}</Text>
                <Text style={styles.listNepali}>{topic.title_np}</Text>
              </View>
              <Text style={{ color: "#999", fontSize: 18 }}>›</Text>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── BOTTOM TAB BAR ──────────────────────────────────────────────────────────

function TabBar({ active, onChange }) {
  const tabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "search", label: "Search", icon: "🔍" },
    { id: "bookmarks", label: "Saved", icon: "🔖" },
  ];
  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tabItem}
          onPress={() => onChange(tab.id)}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.tabIcon, active === tab.id && styles.tabIconActive]}
          >
            {tab.icon}
          </Text>
          <Text
            style={[
              styles.tabLabel,
              active === tab.id && styles.tabLabelActive,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("home");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("jiyo_bookmarks").then((val) => {
      if (val) setBookmarks(JSON.parse(val));
    });
  }, []);

  const toggleBookmark = async (id) => {
    const updated = bookmarks.includes(id)
      ? bookmarks.filter((b) => b !== id)
      : [...bookmarks, id];
    setBookmarks(updated);
    await AsyncStorage.setItem("jiyo_bookmarks", JSON.stringify(updated));
  };

  const handleSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const handleBack = () => {
    setSelectedTopic(null);
  };

  if (selectedTopic) {
    return (
      <DetailScreen
        topic={selectedTopic}
        onBack={handleBack}
        bookmarks={bookmarks}
        toggleBookmark={toggleBookmark}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {tab === "home" && (
        <HomeScreen onSelect={handleSelect} bookmarks={bookmarks} />
      )}
      {tab === "search" && <SearchScreen onSelect={handleSelect} />}
      {tab === "bookmarks" && (
        <BookmarksScreen bookmarks={bookmarks} onSelect={handleSelect} />
      )}
      <TabBar active={tab} onChange={setTab} />
    </View>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },

  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  appName: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1a1a1a",
    letterSpacing: -1,
  },
  appTagline: { fontSize: 13, color: "#888", marginTop: 2 },
  screenTitle: { fontSize: 24, fontWeight: "700", color: "#1a1a1a" },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#888",
    paddingHorizontal: 20,
    marginBottom: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  emergencyBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCEBEB",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  emergencyIcon: { fontSize: 20, marginRight: 10 },
  emergencyText: { flex: 1, fontSize: 15, fontWeight: "700", color: "#A32D2D" },
  emergencyArrow: { fontSize: 22, color: "#A32D2D", fontWeight: "700" },

  grid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 12 },
  topicCard: {
    width: "46%",
    margin: "2%",
    backgroundColor: "#F9F9F7",
    borderRadius: 14,
    padding: 14,
    borderWidth: 0.5,
    borderColor: "#e5e5e0",
  },
  topicIcon: { fontSize: 28, marginBottom: 8 },
  topicTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  topicNepali: { fontSize: 12, color: "#888", marginBottom: 8 },
  severityBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  severityText: { fontSize: 10, fontWeight: "700" },
  bookmarkDot: { position: "absolute", top: 10, right: 10, fontSize: 14 },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2EF",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: "#1a1a1a", height: 44 },
  clearBtn: { fontSize: 16, color: "#999", paddingHorizontal: 8 },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  listIcon: { fontSize: 24, marginRight: 14 },
  listTitle: { fontSize: 15, fontWeight: "600", color: "#1a1a1a" },
  listNepali: { fontSize: 12, color: "#888", marginTop: 2 },

  emptyText: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 40,
    fontSize: 14,
  },

  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  backBtn: { padding: 4 },
  backText: { fontSize: 16, color: "#378ADD", fontWeight: "600" },
  bookmarkBtn: { padding: 4 },
  bookmarkBtnText: { fontSize: 14, color: "#378ADD" },

  detailTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 14,
  },
  detailEmoji: { fontSize: 40, marginRight: 14 },
  detailTitle: { fontSize: 22, fontWeight: "800", color: "#1a1a1a" },
  detailNepali: { fontSize: 13, color: "#888", marginTop: 2 },

  severityBanner: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    borderWidth: 0.5,
  },
  severityBannerText: { fontSize: 13, fontWeight: "600" },

  stepsHeading: {
    fontSize: 13,
    fontWeight: "700",
    color: "#888",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 14,
  },

  stepRow: { flexDirection: "row", marginBottom: 14, alignItems: "flex-start" },
  stepNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 1,
    flexShrink: 0,
  },
  stepNumText: { fontSize: 12, fontWeight: "700", color: "#fff" },
  stepText: { flex: 1, fontSize: 15, color: "#2a2a2a", lineHeight: 22 },

  tipBox: {
    backgroundColor: "#FAEEDA",
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
  },
  tipLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#633806",
    marginBottom: 6,
  },
  tipText: { fontSize: 13, color: "#633806", lineHeight: 20 },

  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#e5e5e0",
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabItem: { flex: 1, alignItems: "center" },
  tabIcon: { fontSize: 22, opacity: 0.4 },
  tabIconActive: { opacity: 1 },
  tabLabel: { fontSize: 11, color: "#999", marginTop: 2 },
  tabLabelActive: { color: "#1a1a1a", fontWeight: "600" },

  emptyState: { alignItems: "center", paddingTop: 60, paddingHorizontal: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    lineHeight: 20,
  },
});
