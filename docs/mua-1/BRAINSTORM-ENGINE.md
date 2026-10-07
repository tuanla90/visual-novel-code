# AI Detective Visual Novel Engine

## Product & Technical Design v0.1

---

# 1. Executive Summary

Dự án là một **Visual Novel dạng điều tra/thám tử**, trong đó người chơi không chỉ đọc hội thoại và chọn lựa chọn, mà còn:

* quan sát hình ảnh để tìm manh mối;
* nghe voice của nhân vật;
* tương tác với nhiều nhân vật;
* xây dựng hoặc phá vỡ các mối quan hệ;
* phát triển kỹ năng điều tra;
* ghi nhớ các sự kiện đã xảy ra;
* đưa ra giả thuyết;
* sử dụng manh mối để thay đổi diễn biến;
* trải qua các event làm thay đổi cả người chơi, nhân vật và thế giới.

Hệ thống AI không nên chỉ có nhiệm vụ:

```text
Story → Dialogue
```

mà nên mô phỏng:

```text
WORLD
  ↓
EVENT
  ↓
OBSERVATION
  ↓
CHARACTER STATE
  ↓
EMOTION
  ↓
INTENTION
  ↓
RELATIONSHIP
  ↓
ACTION / DIALOGUE
  ↓
PLAYER INTERPRETATION
  ↓
CLUE / KNOWLEDGE
  ↓
SKILL / RELATIONSHIP PROGRESSION
  ↓
NEXT EVENT
```

Mục tiêu là tạo cảm giác:

> "Tôi không đang đọc một câu chuyện được AI viết ra. Tôi đang sống trong một thế giới mà các nhân vật, manh mối và sự kiện phản ứng với những gì tôi làm."

---

# 2. Những dự án hiện có và bài học có thể lấy

Không nên xây mọi thứ từ đầu.

Có thể chia các dự án hiện có thành 5 nhóm.

## 2.1. TaleWeaver — AI Visual Novel

TaleWeaver là một open-source AI Visual Novel creator, hỗ trợ story, character, scene, sprite, expression, background, branching narrative, persistent world và visual generation. Nó còn có khả năng kết nối narrative AI với ComfyUI để sinh sprite/background/expression.

### Học được

```text
Story
Character
Scene
Appearance
Expression
Background
Memory
Visual State
```

Đặc biệt hữu ích cho phần:

### Visual State

Ví dụ:

```text
Alice
  outfit = school_uniform
  expression = nervous
  location = classroom
  appearance_state = normal
```

Nếu story chuyển thành:

```text
Alice gets injured
```

thì visual state có thể trở thành:

```text
expression = pain
appearance = injured
```

Đây là hướng rất phù hợp với VN của bạn.

### Nhưng còn thiếu

TaleWeaver chưa phải một **detective simulation engine**.

Nó chưa giải quyết đầy đủ:

* evidence;
* knowledge asymmetry;
* clue interpretation;
* investigation skill;
* suspect reasoning;
* evidence graph;
* forensic reasoning;
* player deduction.

---

# 3. Affinity Agent — Relationship & Emotion

Affinity Agent là một project rất đáng học cho phần character simulation.

Điểm quan trọng nhất của nó là:

> Relationship không phải một con số affection.

Nó mô hình hóa nhiều chiều:

```text
Familiarity
Affection
Trust
Comfort
Attraction
Respect
Tension
Resentment
Repair Debt
Dependency Risk
Relationship Stage
```

Ví dụ:

```json
{
  "alice": {
    "affection": 82,
    "trust": 34,
    "respect": 71,
    "tension": 63
  }
}
```

Điều này cho phép biểu diễn:

> Alice rất thích người chơi nhưng không tin người chơi.

hoặc:

> Alice tin người chơi nhưng đang tức giận.

Đây là thứ cực kỳ quan trọng với detective VN.

---

# 4. AgentGal — Social Relationship Network

AgentGal đi xa hơn relationship giữa Player và NPC.

Các NPC có thể có quan hệ với:

```text
Player
NPC A
NPC B
NPC C
```

và những quan hệ đó tiếp tục thay đổi theo trải nghiệm.

Ví dụ:

```text
Lan
 ├── trusts → Player
 ├── dislikes → Mai
 └── respects → Nam

Mai
 ├── loves → Nam
 ├── fears → Lan
 └── suspects → Player
```

Quan trọng hơn:

> Mỗi nhân vật có thể có cách nhìn khác nhau về cùng một sự kiện.

Ví dụ Player nghĩ:

```text
Mai killed John.
```

Lan nghĩ:

```text
Mai probably killed John.
```

Mai biết:

```text
Mai did not kill John.
```

John biết:

```text
He saw someone else.
```

Nhưng John chưa biết:

```text
Mai has been accused.
```

Đây chính là **Information Asymmetry**.

AgentGal đã đi khá gần ý tưởng này: nhân vật có ký ức riêng, quan hệ riêng, mục tiêu riêng và thông tin không hoàn toàn giống nhau.

Đây là một trong những thành phần tôi đề xuất lấy làm nền tảng cho game của bạn.

---

# 5. ai-galgame — Structured AI VN

ai-galgame cho thấy một hướng rất đáng học:

LLM không trả về một đoạn văn tự do hoàn toàn.

Nó trả về structured output gồm dialogue và command/state update. Project cũng có:

* persistent game state;
* affection;
* character reaction;
* multi-model architecture;
* memory;
* image;
* TTS;
* emotional sprite;
* branching.

Ví dụ concept:

```xml
<dialogue>
...
</dialogue>

<command>
set_emotion(alice, nervous)
change_trust(alice, -5)
unlock_clue(clue_17)
</command>
```

### Bài học quan trọng

Không để LLM tự do sửa game state.

Thay vào đó:

```text
LLM
 ↓
Structured Proposal
 ↓
Game Engine validates
 ↓
Game Engine applies state change
```

---

# 6. Inworld / Convai — Character Runtime

Inworld và Convai cho thấy một hướng khác:

AI Character không chỉ là prompt.

Character cần:

```text
Personality
Knowledge
Memory
Emotion
Relationship
Voice
Action
Context
```

Inworld hiện đã chuyển trọng tâm sang Agent Runtime với long-term memory, expressive voice, emotion và relationship modeling.

Convai cũng có long-term memory để nhân vật nhớ preference, choice và fact từ các interaction trước.

### Bài học

Character Runtime nên tồn tại độc lập với Story Writer.

---

# 7. Dự án của bạn cần phát triển thêm gì?

Đây là phần quan trọng nhất.

Tôi chia thành:

## A. Có thể học trực tiếp

```text
Persistent Memory
Character Personality
Emotion
Relationship
Scene
Visual State
Expression
Voice
Branching
Structured Output
Story Director
```

## B. Cần kết hợp lại

```text
Character
+
Emotion
+
Relationship
+
Memory
+
World State
+
Visual State
```

## C. Đây là phần nên phát triển riêng cho game của bạn

```text
Detective Knowledge Graph
Evidence System
Visual Clue System
Information Asymmetry
Investigation Skill System
Evidence Interpretation
Suspect Model
Inference / Hypothesis System
Event-based Progression
Voice-Emotion Synchronization
```

---

# 8. Kiến trúc tổng thể đề xuất

```text
                    ┌─────────────────────┐
                    │      WORLD           │
                    │ Time / Place / Facts │
                    └──────────┬──────────┘
                               │
                               ↓
                    ┌─────────────────────┐
                    │       EVENT         │
                    │ What happens?       │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             ↓                 ↓                 ↓
        CHARACTER A       CHARACTER B       CHARACTER C
             │                 │                 │
        Personality       Personality       Personality
        Emotion           Emotion           Emotion
        Memory            Memory            Memory
        Knowledge         Knowledge         Knowledge
             │                 │                 │
             └─────────────────┼─────────────────┘
                               ↓
                    ┌─────────────────────┐
                    │ RELATIONSHIP GRAPH  │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │   EVENT DIRECTOR    │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ INTERACTION ENGINE  │
                    │                     │
                    │ Emotion             │
                    │ Intent              │
                    │ Social Strategy     │
                    │ Action              │
                    └──────────┬──────────┘
                               ↓
             ┌─────────────────┼─────────────────┐
             ↓                 ↓                 ↓
         DIALOGUE            VOICE            VISUAL
             │                 │                 │
             └─────────────────┼─────────────────┘
                               ↓
                         PLAYER EXPERIENCE
                               │
             ┌─────────────────┼─────────────────┐
             ↓                 ↓                 ↓
          CHOICE             IMAGE             ACTION
             │                 │                 │
             └─────────────────┼─────────────────┘
                               ↓
                    ┌─────────────────────┐
                    │ INVESTIGATION       │
                    │ ENGINE              │
                    └──────────┬──────────┘
                               ↓
                     CLUES / KNOWLEDGE
                               ↓
                    HYPOTHESIS / DEDUCTION
                               ↓
                    SKILL / RELATIONSHIP
                               ↓
                         NEXT EVENT
```

---

# 9. Core State Model

Game state nên có 7 nhóm.

```text
1. World State
2. Character State
3. Relationship State
4. Emotion State
5. Knowledge State
6. Investigation State
7. Progression State
```

---

# 10. World State

```json
{
  "world": {
    "date": "2026-10-05",
    "time": "21:30",
    "location": "hotel_room_302",
    "weather": "rain",
    "active_event": "murder_case_01"
  }
}
```

World state trả lời:

> Điều gì đang đúng trong thế giới?

---

# 11. Character State

Character không chỉ có personality.

```json
{
  "character": {
    "id": "alice",

    "personality": {
      "openness": 35,
      "honesty": 70,
      "courage": 42,
      "aggression": 18,
      "empathy": 83
    },

    "current_state": {
      "mood": "anxious",
      "energy": 45,
      "stress": 72,
      "fear": 61
    },

    "goals": [
      "hide_her_secret",
      "protect_brother"
    ]
  }
}
```

Personality là relatively stable.

Current state thì thay đổi.

---

# 12. Emotion Engine

Không dùng:

```text
happy = true
```

Mà nên dùng continuous values.

```json
{
  "emotion": {
    "valence": -0.35,
    "arousal": 0.78,

    "fear": 71,
    "anger": 28,
    "sadness": 45,
    "joy": 12,
    "shame": 63,
    "jealousy": 54,
    "trust": 31
  }
}
```

Nhưng emotion còn cần:

```text
CAUSE
INTENSITY
DURATION
TARGET
VISIBILITY
```

Ví dụ:

```json
{
  "emotion_event": {
    "character": "alice",
    "emotion": "jealousy",
    "cause": "player_defended_may",
    "intensity": 64,
    "target": "may",
    "visible_to_player": false
  }
}
```

Điểm `visible_to_player` rất quan trọng.

Alice có thể ghen nhưng người chơi không biết.

---

# 13. Emotion → Behavior → Dialogue

Đừng để:

```text
Emotion → Dialogue
```

Mà:

```text
Emotion
   ↓
Internal State
   ↓
Intent
   ↓
Social Strategy
   ↓
Behavior
   ↓
Dialogue
```

Ví dụ:

```text
Emotion:
Jealousy 70
Fear 20
Affection 80

Intent:
Find out whether Player likes Mai.

Social strategy:
Pretend to be casual.

Behavior:
Avoid eye contact.

Dialogue:
"Mai hôm nay... trông vui nhỉ?"
```

Nếu chỉ prompt:

> "Alice is jealous."

LLM thường sẽ viết:

> "Alice feels jealous."

Quá trực tiếp.

Engine phải buộc AI **diễn cảm xúc qua hành vi**.

---

# 14. Relationship Graph

Relationship không phải một bảng Player → NPC.

Nó là Graph:

```text
            Player
           /      \
        trust      affection
         /          \
      Alice ──────── Mai
        │  rivalry    │
        │             │
      respect       love
        │             │
       John ──────────┘
```

Mỗi edge:

```json
{
  "from": "alice",
  "to": "player",

  "state": {
    "familiarity": 64,
    "trust": 42,
    "affection": 71,
    "respect": 80,
    "fear": 10,
    "resentment": 22,
    "rivalry": 0
  }
}
```

---

# 15. Relationship không chỉ thay đổi bởi Choice

Relationship có thể thay đổi bởi:

```text
Dialogue
Choice
Action
Evidence
Discovery
Promise
Broken Promise
Gift
Help
Betrayal
Lying
Success
Failure
Time
Shared Experience
Third-party interaction
```

Ví dụ:

Player không trực tiếp xúc phạm Alice.

Nhưng Player:

```text
defended Mai
```

Alice:

```text
trust(Player) -5
affection(Player) -2
jealousy +20
```

Như vậy relationship có thể thay đổi **gián tiếp**.

---

# 16. Information Asymmetry

Đây là phần tôi cho rằng cực kỳ quan trọng đối với game thám tử của bạn.

Mỗi entity cần có:

```text
KNOWS
BELIEVES
SUSPECTS
DOES NOT KNOW
MISUNDERSTANDS
```

Ví dụ:

```text
Player:
  knows:
    - John died at 22:00
    - Alice was at hotel
    - broken glass found

Alice:
  knows:
    - John threatened her
    - she saw someone leave

Alice believes:
    - Player suspects her

May:
  knows:
    - John had a second phone

May does NOT know:
    - phone was found

John:
    knows:
    - identity of killer
```

Đây tạo ra:

```text
Secrets
Lies
Misunderstandings
Conflicting Testimony
Hidden Motives
False Accusations
Reveals
```

Đây chính là nền tảng của detective story.

---

# 17. Detective Engine

Game của bạn khác Visual Novel thông thường ở đây.

Người chơi phải **tự quan sát**.

Do đó cần một:

# Evidence System

Mỗi clue là một entity.

```json
{
  "clue": {
    "id": "clue_023",

    "type": "visual",

    "source": "scene_image_07",

    "location": {
      "x": 0.73,
      "y": 0.41
    },

    "description": "small blood stain",

    "visibility": 0.45,

    "required_skill": {
      "observation": 30
    },

    "reliability": 0.90
  }
}
```

---

# 18. Image Investigation

Hình ảnh không chỉ để trang trí.

Một scene image có thể chứa:

```text
Character
Object
Background
Lighting
Position
Expression
Clue
Hidden Clue
Inconsistency
Temporal clue
Spatial clue
```

Ví dụ:

```text
Scene Image:

┌─────────────────────────────┐
│                             │
│       Alice                 │
│                             │
│                  Clock      │
│                   ↓         │
│              22:43          │
│                             │
│  Broken glass               │
│       ↓                     │
│     [CLUE]                  │
│                             │
└─────────────────────────────┘
```

Người chơi click vào:

```text
broken glass
```

Engine kiểm tra:

```text
Observation skill
+
current knowledge
+
object visibility
```

Sau đó unlock:

```text
CLUE_GLASS_01
```

---

# 19. Visual Clue không nhất thiết phải là "hidden object"

Đây là điểm có thể làm game của bạn khác biệt.

Có 3 cấp:

### Level 1 — Visible

Người chơi chỉ cần click đúng.

```text
Blood stain
```

### Level 2 — Observation

Phải nhận ra anomaly.

```text
Two cups
but only one person claimed to be there.
```

### Level 3 — Interpretation

Người chơi phải tự kết nối.

```text
Wet umbrella
+
dry floor
+
rain started 30 minutes ago
```

→ Someone entered before the rain.

Engine không nên nói luôn đáp án.

---

# 20. Evidence Graph

Manh mối không nên tồn tại độc lập.

```text
Blood stain
      │
      ↓
Broken glass
      │
      ↓
Possible struggle
      │
      ↓
Alice's statement inconsistent
      │
      ↓
Alice becomes suspect
```

Có thể lưu:

```json
{
  "evidence_graph": [
    {
      "from": "clue_blood",
      "relation": "supports",
      "to": "hypothesis_struggle"
    },
    {
      "from": "clue_glass",
      "relation": "supports",
      "to": "hypothesis_struggle"
    },
    {
      "from": "alice_statement",
      "relation": "contradicts",
      "to": "hypothesis_struggle"
    }
  ]
}
```

---

# 21. Player Knowledge

Player cũng phải có memory riêng.

```json
{
  "player_knowledge": {

    "facts": [],

    "clues": [],

    "suspicions": [],

    "hypotheses": [],

    "known_relationships": [],

    "unresolved_questions": []
  }
}
```

Điểm quan trọng:

> Game Engine biết sự thật ≠ Player biết sự thật.

Ví dụ:

```text
World Truth:
Alice was not the killer.

Player:
Suspects Alice.

Alice:
Knows she is innocent.

John:
Knows who the killer is.
```

Nếu không tách ba tầng này, AI detective game rất dễ spoil.

---

# 22. Hypothesis System

Player có thể xây dựng:

```text
Who killed John?
Why?
When?
How?
```

Một hypothesis:

```json
{
  "hypothesis": {
    "suspect": "alice",
    "motive": "revenge",
    "method": "poison",
    "time": "21:30"
  }
}
```

Evidence có thể:

```text
support
contradict
weaken
strengthen
unknown
```

Không nhất thiết phải có AI nói:

> "Đúng!"

Thay vào đó:

```text
Evidence consistency = 72%
```

và người chơi tự suy luận.

---

# 23. Investigation Skill System

Đây là phần mới rất quan trọng trong dự án.

Player có skill:

```text
Observation
Logic
Memory
Interrogation
Empathy
Deduction
Forensics
Deception Detection
Research
```

Ví dụ:

```json
{
  "player_skill": {
    "observation": 42,
    "logic": 31,
    "memory": 57,
    "interrogation": 28,
    "empathy": 45,
    "deduction": 36
  }
}
```

---

# 24. Skill không chỉ để mở khóa dialogue

Skill nên ảnh hưởng tới **cách người chơi nhìn thế giới**.

Ví dụ:

```text
Observation = 20
```

→ thấy:

```text
broken glass
```

Observation = 60

→ thấy:

```text
broken glass
+ tiny blood stain
+ glass fragments point inward
```

Observation = 85

→ phát hiện:

```text
glass was broken AFTER the blood fell.
```

Như vậy progression trở thành:

> Người chơi thực sự cảm thấy mình giỏi hơn.

---

# 25. Skill Growth

Sau mỗi event:

```text
Event
 ↓
Actions
 ↓
Performance
 ↓
Skill XP
 ↓
Skill Level
```

Ví dụ:

```text
Event: Interview Alice

Correctly detect lie:
Interrogation +8 XP

Notice emotional micro-expression:
Empathy +5 XP

Correctly connect contradiction:
Logic +10 XP
```

Sau nhiều event:

```text
Observation 35 → 42
Logic 27 → 31
Empathy 40 → 45
```

---

# 26. Relationship + Skill = Player Build

Đây là một mechanic rất hay có thể phát triển riêng.

Hai người chơi có thể chơi cùng một story nhưng trở thành detective khác nhau.

### Player A

```text
Observation 85
Logic 70
Empathy 20
Interrogation 25
```

→ giỏi tìm physical clues.

### Player B

```text
Observation 35
Logic 40
Empathy 85
Interrogation 72
```

→ giỏi đọc người.

Cùng scene:

```text
Alice:
"I don't remember."
```

Player A:

```text
Notice:
clock reflection
```

Player B:

```text
Notice:
Alice's emotional hesitation
```

Hai người có thể đi đến cùng một sự thật bằng đường khác nhau.

---

# 27. Event System

Mỗi event không nên chỉ là một Scene.

Event nên có:

```text
Trigger
Participants
Location
Objective
Knowledge Changes
Relationship Changes
Emotion Changes
Skill Opportunities
Clues
Choices
Consequences
Exit Conditions
```

Ví dụ:

```json
{
  "event": "interview_alice",

  "trigger": {
    "case_progress": 40,
    "alice_trust": 20
  },

  "participants": [
    "player",
    "alice"
  ],

  "objectives": [
    "discover_alibi"
  ],

  "clues": [
    "alice_watch",
    "alice_timeline"
  ],

  "possible_outcomes": [
    "alice_confesses_partial_truth",
    "alice_lies",
    "alice_ends_interview"
  ]
}
```

---

# 28. Event nên là đơn vị progression chính

Thay vì:

```text
Chapter 1
Chapter 2
Chapter 3
```

nên có:

```text
EVENT 001
 ↓
EVENT 002
 ↓
EVENT 003
```

Mỗi event thay đổi state.

Ví dụ:

```text
EVENT 001
First meeting
 ↓
affection +5
trust +3
observation XP +5

EVENT 002
First investigation
 ↓
logic XP +10
clue discovered

EVENT 003
Alice lies
 ↓
trust -10
suspicion +15

EVENT 004
Player protects Alice
 ↓
trust +20
affection +8
```

Story vì vậy trở thành:

> một chuỗi state transition.

---

# 29. Story Director

LLM không nên tự quyết định tất cả event.

Story Director quyết định:

```text
Which events are available?
Which events are locked?
Which event has priority?
What must happen before?
What can happen after?
```

Ví dụ:

```text
Event A:
requires clue_01

Event B:
requires relationship_alice > 50

Event C:
requires player_skill_logic > 40

Event D:
requires player believes alice is innocent
```

LLM chỉ được lựa chọn trong những event hợp lệ.

---

# 30. LLM Architecture

Không nên dùng một LLM cho tất cả.

Đề xuất:

```text
                 GAME ENGINE
                      │
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
    Director       Character      Detective
        │           Engine         Engine
        │             │              │
        ↓             ↓              ↓
      LLM           LLM            Rules
```

### Story Director

Quyết định:

```text
What happens next?
```

### Character AI

Quyết định:

```text
How does Alice react?
```

### Dialogue AI

Quyết định:

```text
How does Alice express it?
```

### Detective Engine

Nên chủ yếu là deterministic.

```text
Evidence
Skill
Knowledge
Hypothesis
```

Không nên để LLM tự phán:

> Player đã tìm đúng clue.

---

# 31. State Update Pipeline

Mỗi interaction:

```text
PLAYER ACTION
      ↓
Interpretation
      ↓
Rule Engine
      ↓
Character Reaction
      ↓
Emotion Update
      ↓
Relationship Update
      ↓
Knowledge Update
      ↓
Memory Update
      ↓
Skill XP
      ↓
Event Progress
      ↓
Dialogue / Voice / Visual
```

---

# 32. Voice

Voice không nên chỉ là:

```text
Text → TTS
```

Mà nên:

```text
Emotion
+
Intensity
+
Intent
+
Character Voice Profile
        ↓
       TTS
```

Ví dụ:

```json
{
  "voice": {
    "emotion": "suppressed_anger",
    "intensity": 0.65,
    "speed": 0.92,
    "pitch": -0.05,
    "pause_before_reply": 0.4
  }
}
```

Cùng một câu:

> "Tôi không biết."

có thể là:

```text
fear
anger
sarcasm
sadness
honesty
```

Voice phải phản ánh intent/emotion chứ không chỉ text.

---

# 33. Visual Expression

Expression cũng lấy từ:

```text
Emotion
Intent
Social Mask
```

Ví dụ:

```text
Internal:
jealousy = 80

Social Mask:
neutral = 70%

Visible:
slight smile
avoid eye contact
```

Như vậy nhân vật có thể:

> nói bình thường nhưng hình ảnh/voice khiến người chơi cảm thấy có gì đó không ổn.

Đây rất phù hợp với detective genre.

---

# 34. Visual Scene State

Mỗi scene cần:

```text
Location
Time
Lighting
Weather
Characters
Character Pose
Expression
Outfit
Objects
Clues
Camera
Music
Voice
```

Ví dụ:

```json
{
  "scene": {
    "location": "hotel_room",
    "time": "22:43",
    "lighting": "dark",

    "characters": [
      {
        "id": "alice",
        "position": "left",
        "pose": "standing",
        "expression": "nervous"
      }
    ],

    "objects": [
      {
        "id": "clock",
        "visible": true
      },
      {
        "id": "blood_stain",
        "visible": true,
        "clue": true
      }
    ]
  }
}
```

---

# 35. Memory System

Có ít nhất 4 loại memory.

## Episodic Memory

```text
"Player helped Alice escape."
```

## Semantic Memory

```text
"Alice hates hospitals."
```

## Relationship Memory

```text
"Alice stopped trusting Player after the lie."
```

## Investigation Memory

```text
"Player discovered blood stain in room 302."
```

Không nên cho toàn bộ history vào prompt.

Phải retrieve:

```text
Current Event
+
Relevant Memories
+
Relevant Relationship
+
Relevant Knowledge
```

---

# 36. Memory Importance

Mỗi memory có:

```text
importance
emotional intensity
recency
relationship relevance
case relevance
```

Ví dụ:

```json
{
  "memory": "Alice lied about where she was",

  "importance": 0.85,
  "emotion": 0.70,
  "case_relevance": 0.95,
  "relationship_relevance": 0.80
}
```

Memory này phải được ưu tiên retrieve khi:

```text
Alice
+
alibi
+
trust
```

xuất hiện trong scene.

---

# 37. Truth Layer

Detective game bắt buộc phải có một lớp mà LLM không được tự ý thay đổi:

```text
CANONICAL TRUTH
```

Ví dụ:

```json
{
  "case_001": {

    "killer": "johnson",

    "weapon": "knife",

    "time": "21:47",

    "location": "kitchen",

    "motive": "blackmail",

    "hidden_facts": [
      "johnson_broke_window",
      "alice_arrived_at_22_10"
    ]
  }
}
```

AI phải kể chuyện **xung quanh sự thật**, không được tự phát minh lại sự thật.

---

# 38. Three Layers of Knowledge

Đây là một kiến trúc tôi đặc biệt khuyến nghị.

```text
WORLD TRUTH
     ↓
CHARACTER KNOWLEDGE
     ↓
PLAYER KNOWLEDGE
```

Ví dụ:

```text
WORLD:
Johnson killed John.

Alice:
knows Johnson was present.

Player:
does not know Johnson was present.

Mai:
believes Alice killed John.
```

LLM khi generate Alice phải chỉ được nhìn:

```text
WORLD TRUTH
+
ALICE KNOWLEDGE
+
ALICE MEMORY
+
CURRENT EVENT
```

Không được đưa:

```text
PLAYER'S HIDDEN INFORMATION
```

vào context của Alice nếu Alice không biết.

---

# 39. Đây là điểm khác biệt lớn với chatbot

Chatbot:

```text
One shared context
```

Game của bạn:

```text
World Truth
     │
 ┌───┼────┐
 ↓   ↓    ↓
Alice Mai Player
 │    │     │
Knowledge
Memory
Beliefs
```

Mỗi entity có **epistemic state riêng**.

---

# 40. "Đơn vị" trong hệ thống

Tôi đề xuất định nghĩa 6 loại entity:

```text
PERSON
OBJECT
LOCATION
EVENT
CLUE
CONCEPT
```

Ví dụ:

```text
PERSON:
Alice

OBJECT:
Watch

LOCATION:
Hotel Room 302

EVENT:
Murder

CLUE:
Broken Glass

CONCEPT:
Alice's Alibi
```

Các entity này có thể liên kết:

```text
Alice
 ├── owns → Watch
 ├── visited → Hotel Room
 ├── claims → Alibi
 └── knows → Clue
```

---

# 41. Entity Relationship Graph

Toàn bộ game cuối cùng trở thành graph:

```text
                    Murder
                   /      \
               happened    caused_by
                 /            \
          Hotel Room          Johnson
             │                  │
           contains          knows
             │                  │
        Broken Glass          Alice
             │
          supports
             ↓
       Struggle Theory
```

Đây là nơi AI có thể khai thác cực mạnh.

---

# 42. AI nên làm gì trong Graph?

AI có thể:

```text
generate dialogue
interpret emotion
generate social behavior
summarize memory
propose event
generate visual prompt
generate voice style
```

Nhưng engine quyết định:

```text
truth
state
relationship numbers
skill XP
clue validity
event prerequisites
knowledge ownership
```

---

# 43. Rule vs AI

Một nguyên tắc quan trọng:

## Deterministic

```text
HP
XP
Skill
Relationship values
Event unlock
Clue ownership
Truth
Inventory
Time
Game flags
```

## AI

```text
Dialogue
Emotion interpretation
Social strategy
Natural language
Visual description
Voice delivery
Memory summary
Possible event proposal
```

Không nên đảo ngược hai nhóm này.

---

# 44. Example: Một Event hoàn chỉnh

## Event

```text
RAINY NIGHT — HOTEL 302
```

Player bước vào phòng.

Visual:

```text
Alice đứng bên cửa sổ.
Ngoài trời mưa.
Một chiếc đồng hồ chỉ 22:43.
Trên sàn có những mảnh kính.
```

Player click:

```text
clock
```

Observation skill = 40.

Engine:

```text
clock clue unlocked
```

Player hỏi Alice:

> "Cô đến đây lúc mấy giờ?"

Alice:

```text
Emotion:
fear 40
stress 65

Relationship:
trust 30

Intent:
hide_arrival_time

Strategy:
answer vaguely
```

Dialogue:

> "Khoảng... mười giờ."

Voice:

```text
hesitant
low volume
pause = 0.3s
```

Visual:

```text
eyes avoid player
```

Player nhớ:

```text
clock = 22:43
```

Sau đó Player tìm thấy:

```text
wet umbrella
```

Player suy luận:

```text
Alice probably arrived after rain started.
```

Event kết thúc:

```text
Logic XP +8
Observation XP +5

Alice trust -3
Alice tension +7

clue_umbrella unlocked

new event:
"Confront Alice"
```

Đây mới là một **AI-driven detective event**.

---

# 45. Player Progression

Progression không chỉ là:

```text
Level 1 → Level 2
```

Mà gồm:

```text
SKILL
RELATIONSHIP
KNOWLEDGE
REPUTATION
CASE PROGRESS
```

Ví dụ:

```text
Player

Observation      42
Logic             36
Empathy           51
Interrogation     28
Memory            64

Reputation:
  Police          30
  Civilians       52
  Suspects        18

Case:
  Murder #01      43%
```

---

# 46. Character Progression

NPC cũng phát triển.

```text
Alice
Trust Player: 35 → 62

Fear: 20 → 47

Relationship:
Acquaintance → Close

Knowledge:
+3 new facts

Memory:
+2 important events
```

Như vậy:

> Event làm thay đổi cả Player lẫn World lẫn NPC.

---

# 47. Event Impact Vector

Mỗi event có thể có:

```json
{
  "impact": {

    "player": {
      "logic_xp": 10,
      "observation_xp": 5
    },

    "relationships": {
      "alice_player": {
        "trust": -5,
        "affection": 3
      }
    },

    "knowledge": {
      "unlock": [
        "alice_was_at_hotel"
      ]
    },

    "case": {
      "progress": 8
    }
  }
}
```

Đây là một cách rất tốt để kiểm soát progression.

---

# 48. AI Script Generation Workflow

Thay vì:

```text
"Write Chapter 3."
```

hãy dùng:

```text
STEP 1
Generate Event Plan

STEP 2
Validate prerequisites

STEP 3
Generate character intentions

STEP 4
Generate emotional state

STEP 5
Generate interaction strategy

STEP 6
Generate dialogue

STEP 7
Generate visual state

STEP 8
Generate voice direction

STEP 9
Generate clues

STEP 10
Generate state transitions

STEP 11
Validate

STEP 12
Commit
```

---

# 49. Script không nên là text

Nên là structured data.

Ví dụ:

```json
{
  "event": "EV_023",

  "scene": {
    "location": "hotel_room_302",
    "time": "22:43"
  },

  "participants": [
    "player",
    "alice"
  ],

  "beats": [

    {
      "type": "observation",

      "target": "clock",

      "clue": "CLUE_021"
    },

    {
      "type": "dialogue",

      "speaker": "alice",

      "emotion": "anxious",

      "intent": "hide_truth",

      "text": "Khoảng mười giờ..."
    },

    {
      "type": "voice",

      "speaker": "alice",

      "delivery": "hesitant"
    },

    {
      "type": "visual",

      "expression": "avoid_eye_contact"
    }
  ]
}
```

---

# 50. Validator

Đây là phần rất cần thiết để giải quyết vấn đề hiện tại của bạn: "AI sinh script tệ".

Sau khi AI sinh script:

```text
SCRIPT
 ↓
VALIDATOR
```

Kiểm tra:

### Canon

```text
Does Alice know this?
```

### Timeline

```text
Can Alice be here at this time?
```

### Relationship

```text
Would Alice trust Player enough to say this?
```

### Emotion

```text
Does dialogue match emotional state?
```

### Knowledge

```text
Is this information available to the speaker?
```

### Evidence

```text
Does this clue already exist?
```

### Skill

```text
Can Player discover this clue at current skill?
```

### Visual

```text
Is the object actually present in the image?
```

### Voice

```text
Does voice direction match emotion?
```

---

# 51. AI Script Quality Score

Có thể tạo:

```text
Continuity       95
Character        88
Emotion          91
Relationship     94
Mystery          86
Visual           92
Voice            90
Pacing           84
```

Nếu:

```text
Score < 80
```

→ regenerate.

Nếu:

```text
Score >= 90
```

→ accept.

---

# 52. Một điểm rất mới: Narrative QA

Sau mỗi event, engine có thể hỏi:

```text
What changed?
```

và tạo diff:

```text
BEFORE

Alice:
Trust = 35
Fear = 20

Player:
Observation = 42

Knowledge:
CLUE_12 unknown
```

AFTER:

```text
Alice:
Trust = 31
Fear = 44

Player:
Observation = 47

Knowledge:
CLUE_12 discovered
```

Nếu AI nói:

> Alice trusted the player more.

nhưng:

```text
trust 35 → 31
```

→ validator phát hiện lỗi.

---

# 53. Kiến trúc cuối cùng

Tôi đề xuất hệ thống gồm 10 engine:

```text
1. WORLD ENGINE
2. CHARACTER ENGINE
3. EMOTION ENGINE
4. RELATIONSHIP ENGINE
5. MEMORY ENGINE
6. KNOWLEDGE ENGINE
7. DETECTIVE / EVIDENCE ENGINE
8. PROGRESSION ENGINE
9. EVENT / STORY DIRECTOR
10. PRESENTATION ENGINE
```

Presentation:

```text
Image
Sprite
Expression
Animation
Voice
Music
Camera
Dialogue
```

---

# 54. Cái gì là "học lại"

Có thể reuse ý tưởng từ:

### TaleWeaver

```text
Visual State
Expression
Scene
Character
Memory
AI image generation
```

### Affinity Agent

```text
Relationship vector
Emotion
Memory
Event director
Relationship progression
```

### AgentGal

```text
Multi-character relationship
Information asymmetry
Character-specific knowledge
Dynamic social network
```

### ai-galgame

```text
Structured LLM output
Persistent state
Multi-model architecture
Visual + TTS
Branching
```

### Inworld / Convai

```text
Character runtime
Long-term memory
Emotion
Relationship
Voice
```

---

# 55. Cái gì là "sản phẩm mới" của dự án

Đây là phần có thể trở thành USP.

## 1. Detective Knowledge Graph

Không chỉ relationship graph.

```text
Who knows what?
Who believes what?
Which evidence supports which hypothesis?
```

## 2. Visual Evidence System

Hình ảnh trở thành một phần gameplay.

Không phải:

```text
Background
```

mà:

```text
Interactive Evidence Surface
```

## 3. Player Skill → Perception

Skill thay đổi **những gì người chơi có khả năng nhận ra**.

## 4. Emotion → Behavior → Voice → Visual

Cùng một emotion được biểu hiện đồng bộ qua:

```text
Dialogue
Voice
Expression
Pose
Timing
```

## 5. Multi-agent social simulation

NPC không chỉ phản ứng với Player.

NPC còn:

```text
talk to NPC
lie to NPC
trust NPC
suspect NPC
protect NPC
manipulate NPC
```

## 6. Event-driven progression

Mỗi event làm thay đổi:

```text
Player
NPC
Relationship
Emotion
Knowledge
Skill
Case
World
```

---

# 56. Định nghĩa sản phẩm

Tôi sẽ không gọi sản phẩm đơn giản là:

> AI Visual Novel Generator

Tên mô hình phù hợp hơn:

> **AI Narrative Simulation Engine for Detective Visual Novels**

Hoặc ngắn hơn:

> **AI Detective VN Engine**

Core loop:

```text
OBSERVE
   ↓
INTERACT
   ↓
INFER
   ↓
DECIDE
   ↓
CONSEQUENCE
   ↓
PROGRESS
   ↓
DISCOVER
```

---

# 57. Core Design Philosophy

Có 5 nguyên tắc nên giữ từ đầu.

### Principle 1

> **The AI should simulate the story, not own the truth.**

AI không được tự sửa canonical truth.

### Principle 2

> **Characters react based on what they know, not what the player knows.**

### Principle 3

> **Emotion should change behavior, not just dialogue labels.**

### Principle 4

> **Images should contain gameplay information.**

### Principle 5

> **Every meaningful event should change the state of the world.**

---

# 58. MVP

Không nên xây toàn bộ ngay.

MVP đầu tiên nên chỉ có:

```text
3 Characters
1 Detective Case
5 Events
5–10 Images
20–30 Clues
5 Player Skills
Relationship Graph
Emotion Engine
Memory
Voice
```

Core gameplay:

```text
Scene
 ↓
Image
 ↓
Player observes
 ↓
Find clue
 ↓
Talk to character
 ↓
Character reacts according to:
   personality
   emotion
   relationship
   knowledge
 ↓
Voice + Expression
 ↓
Player makes deduction
 ↓
Skill / Relationship changes
 ↓
Next Event
```

Nếu MVP này hoạt động tốt, mới mở rộng sang:

```text
10–20 characters
100+ events
multiple cases
complex relationship graph
dynamic endings
```

---

# 59. Kiến trúc dữ liệu cấp cao

```text
GAME
│
├── World
│
├── Truth
│
├── Characters
│   ├── Personality
│   ├── Emotion
│   ├── Memory
│   └── Knowledge
│
├── Relationships
│
├── Player
│   ├── Skills
│   ├── Knowledge
│   ├── Evidence
│   ├── Hypotheses
│   └── Reputation
│
├── Cases
│   ├── Truth
│   ├── Events
│   ├── Evidence
│   └── Hypotheses
│
├── Scenes
│   ├── Images
│   ├── Characters
│   ├── Objects
│   └── Interactive Clues
│
├── Voice
│
└── Event History
```

---

# 60. Kết luận

Dự án này thực chất có 3 lớp lớn:

```text
                 ┌────────────────────┐
                 │   NARRATIVE AI     │
                 │                    │
                 │ Story / Dialogue   │
                 │ Character behavior │
                 └─────────┬──────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ↓                         ↓
      SOCIAL SIMULATION          DETECTIVE SIMULATION
      ─────────────────          ───────────────────
      Emotion                    Evidence
      Relationship               Knowledge
      Memory                     Hypothesis
      Personality                Skill
      Intent                     Deduction
      NPC ↔ NPC                  Image clues
              │                         │
              └────────────┬────────────┘
                           ↓
                  ┌──────────────────┐
                  │ VISUAL NOVEL     │
                  │                  │
                  │ Image            │
                  │ Expression       │
                  │ Voice            │
                  │ Animation        │
                  │ Music            │
                  └──────────────────┘
```

Các project hiện có đã giải quyết khá tốt **từng mảnh**: TaleWeaver về AI-VN và visual state; Affinity Agent về relationship/emotion/memory; AgentGal về multi-agent social world và information asymmetry; ai-galgame về structured AI-VN + image/TTS; Inworld/Convai về character runtime, memory, emotion và voice.

**Phần tôi cho rằng đáng phát triển thành điểm khác biệt của dự án bạn** là ghép chúng với **detective simulation**: `Visual Evidence → Knowledge → Hypothesis → Skill → Event → Relationship`, đồng thời giữ một lớp **Canonical Truth** để AI không phá logic vụ án.

Nếu làm đúng kiến trúc này, vấn đề "AI viết script tệ" sẽ được giải quyết theo hướng khác: **không cố ép một LLM viết một script hoàn hảo**, mà xây một engine khiến AI chỉ được viết trong một thế giới có state, luật, ký ức, quan hệ, cảm xúc và bằng chứng rõ ràng.
