import { Exercise } from '../types';

export const EXERCISES: Exercise[] = [
  {
    id: 'pushups',
    nameEn: 'Push Ups',
    nameKu: 'پاڵنانی سەر زەوی (شناو)',
    nameKm: 'Push Ups (Şinaw)',
    muscleGroup: 'chest',
    difficulty: 'intermediate',
    animationType: 'pushups',
    instructionsEn: [
      'Start in a plank position with hands slightly wider than shoulder-width apart.',
      'Keep your core tight, back straight, and neutral spine.',
      'Lower your chest until it nearly touches the floor while elbows bend at a 45-degree angle.',
      'Push firmly through your palms to return to the starting position.'
    ],
    instructionsKu: [
      'لەسەر دەست و پێیەکانت ڕابوەستە بە دووری کەمێک زیاتر لە شانت.',
      'پشتت بە ڕێکی ڕابگرە و ماسولکەکانی سکت توند بکە.',
      'سنگت دابەزێنە تا نزیک زەوی دەبێتەوە و ئانیشکەکانت لە گۆشەی ٤٥ پلەدا بچەمێنەرەوە.',
      'بە هێزی دەستەکانت خۆت پاڵ بنێ بەرەو سەرەوە بۆ دۆخی سەرەتایی.'
    ],
    instructionsKm: [
      'Di pozîsyona plankê de destên xwe hinekî ji milan firehtir deyne.',
      'Pişta xwe rast û zikê xwe tund bigire.',
      'Sînga xwe nêzîkî erdê bike û enîşkên xwe bi goşeya 45 pileyî biçemîne.',
      'Bi kefa destên xwe xwe ber bi jor ve bikişîne.'
    ],
    commonMistakesEn: [
      'Sagging hips or arching the lower back.',
      'Flaring elbows out at 90 degrees.',
      'Not going low enough or only bobbing your head.'
    ],
    commonMistakesKu: [
      'داکەوتنی ناوقەد یان چەمانەوەی نادروستی بەشی خوارەوەی پشت.',
      'کردنەوەی زۆری ئانیشکەکان بە گۆشەی ٩٠ پلە.',
      'دانەبەزینی تەواوی سنگ بۆ خوارەوە.'
    ],
    commonMistakesKm: [
      'Xwarbûna pişta jêrîn an zik.',
      'Vekirina zêde ya enîşkan.',
      'Nezivîna tam ber bi erdê ve.'
    ],
    safetyTipsEn: [
      'If regular push-ups are too difficult, perform them on your knees or against an elevated wall.',
      'Maintain continuous rhythmic breathing; exhale as you push up.'
    ],
    safetyTipsKu: [
      'ئەگەر شناوی ئاسایی قورس بوو، دەتوانیت لەسەر ئەژنۆ یان بەرامبەر دیوار ئەنجامی بدەیت.',
      'هەناسەدانت ڕێکبخە؛ لە کاتی پاڵنانی سەرەوە هەناسە بدەرەوە.'
    ],
    safetyTipsKm: [
      'Heger zehmet be, dikarî li ser çongan an li ber dîwêr bikî.',
      'Gava ku xwe hildikişînî jor bêhna xwe bide der.'
    ],
    defaultDurationSec: 30,
    defaultReps: 12,
    isRepsBased: true,
    caloriesBurnedPerMin: 9
  },
  {
    id: 'squats',
    nameEn: 'Bodyweight Squats',
    nameKu: 'دانیشتن و هەستان (سکوات)',
    nameKm: 'Squats (Skwat)',
    muscleGroup: 'legs',
    difficulty: 'beginner',
    animationType: 'squats',
    instructionsEn: [
      'Stand upright with feet shoulder-width apart and toes pointing slightly outward.',
      'Hinge at your hips and bend your knees as if sitting back into an invisible chair.',
      'Keep your chest high and weight evenly distributed through your heels.',
      'Descend until thighs are parallel to the floor, then drive up through your heels.'
    ],
    instructionsKu: [
      'بە پێوە ڕابوەستە، پێیەکانت بە پانی شانت بکەرەوە.',
      'حەوزت بەرەو دواوە بەرە و ئەژنۆکانت بچەمێنەرەوە وەکو دانیشتن لەسەر کورسی.',
      'سنگت بەرز ڕابگرە و کێشت بخەرە سەر پاژنەی پێیەکانت.',
      'دابەزە تا ڕانەکانت هاوتەریبی زەوی دەبن، پاشان هەستەوە.'
    ],
    instructionsKm: [
      'Lingên xwe bi firehiya milan veke û seranser bisekine.',
      'Hêza xwe bide ser panîyan û çokên xwe biçemîne mîna ku rûnî ser kursiyekê.',
      'Sînga xwe bilind bigire û heta ku ran paralelî erdê bibin dakeve.',
      'Bi hêza panîyan rabe ser xwe.'
    ],
    commonMistakesEn: [
      'Allowing knees to cave inward.',
      'Lifting heels off the ground.',
      'Rounding the lower back forward.'
    ],
    commonMistakesKu: [
      'چوونە ناوەوەی ئەژنۆکان بۆ لای یەکتر.',
      'بەرزکردنەوەی پاژنەی پێ لەسەر زەوی.',
      'چەمانەوەی پشت بەرەو پێشەوە.'
    ],
    commonMistakesKm: [
      'Ketin an nêzîkbûna çokan ber bi hundur ve.',
      'Bilindkirina panîyan ji ser erdê.',
      'Xwarbûna piştê ber bi pêş.'
    ],
    safetyTipsEn: [
      'Keep your knees tracking directly over your second toes.',
      'Engage your abdominal muscles throughout the movement.'
    ],
    safetyTipsKu: [
      'ئەژنۆکانت با هاوتەریبی پەنجەکانی پێت بجوڵێن.',
      'ماسولکەکانی سکت لە کاتی جوڵەکەدا توند بکە.'
    ],
    safetyTipsKm: [
      'Hişyar be ku çokên te bi aliyê tiliyên lingê ve biçin.',
      'Zikê xwe di hemû tevgerê de tund bigire.'
    ],
    defaultDurationSec: 35,
    defaultReps: 15,
    isRepsBased: true,
    caloriesBurnedPerMin: 8
  },
  {
    id: 'lunges',
    nameEn: 'Alternating Lunges',
    nameKu: 'هەنگاونانی درێژ (لەنگز)',
    nameKm: 'Lunges (Gava Dirêj)',
    muscleGroup: 'legs',
    difficulty: 'intermediate',
    animationType: 'lunges',
    instructionsEn: [
      'Stand tall with hands on your hips or chest.',
      'Take a large step forward with your right leg and lower your hips.',
      'Bend both knees to roughly 90 degrees; your back knee should hover just above the floor.',
      'Drive through your front heel back to the starting stance, then alternate legs.'
    ],
    instructionsKu: [
      'بە ڕێکی ڕابوەستە و دەستەکانت لەسەر کەمەرت دابنێ.',
      'هەنگاوێکی گەورە بنێ بۆ پێشەوە بە قاچی ڕاستت و حەوزت دابەزێنە.',
      'هەردوو ئەژنۆت بە گۆشەی ٩٠ پلە بچەمێنەرەوە، ئەژنۆی دواوە با نزیکی زەوی بێت.',
      'بە پاژنەی پێی پێشەوەت خۆت بگەڕێنەرەوە و بە قاچەکەی تر دووبارەی بکەرەوە.'
    ],
    instructionsKm: [
      'Bi rihetî seranser bisekine û destên xwe deyne ser kemberê.',
      'Gavek mezin bi lingê rastê ber bi pêş ve bavêje.',
      'Her du çokan bi goşeya 90 pileyî biçemîne.',
      'Bi panîya pêşîn vegere cihê xwe û bi lingê din berdewam bike.'
    ],
    commonMistakesEn: [
      'Front knee pushing excessively far beyond toes.',
      'Torso leaning drastically forward.',
      'Banging the trailing knee against the floor.'
    ],
    commonMistakesKu: [
      'دەرچوونی زۆری ئەژنۆی پێشەوە لە پەنجەی پێ.',
      'لاربوونەوەی زۆری لاشە بۆ پێشەوە.',
      'کێشانی ئەژنۆی دواوە بە توندی لە زەوی.'
    ],
    commonMistakesKm: [
      'Derbasbûna çokê ji tiliyên pêşîn.',
      'Xwarbûna bedenê ber bi pêş ve.',
      'Lêdana çokê paşîn li erdê.'
    ],
    safetyTipsEn: [
      'Keep your core active to maintain balance.',
      'Step slightly wider if you feel unsteady.'
    ],
    safetyTipsKu: [
      'سکت توند بکە بۆ ڕاگرتنی هاوسەنگی لاشەت.',
      'ئەگەر هاوسەنگیت تێکچوو پێیەکانت کەمێک پانتر بکەرەوە.'
    ],
    safetyTipsKm: [
      'Ji bo hevsengiyê zikê xwe zexm bigire.',
      'Heger hevsengî dijwar be, lingan hinekî firehtir veke.'
    ],
    defaultDurationSec: 30,
    defaultReps: 12,
    isRepsBased: true,
    caloriesBurnedPerMin: 8
  },
  {
    id: 'plank',
    nameEn: 'Forearm Plank',
    nameKu: 'پلانک (ڕاگرتنی لەش)',
    nameKm: 'Plank (Ragirtina Laş)',
    muscleGroup: 'abs',
    difficulty: 'beginner',
    animationType: 'plank',
    instructionsEn: [
      'Lie face down and place forearms on the floor directly beneath your shoulders.',
      'Tuck your toes and lift your body off the floor.',
      'Form a straight, rigid line from head to heels.',
      'Hold the position firmly while breathing smoothly and bracing your abdominals.'
    ],
    instructionsKu: [
      'لەسەر دەم پاڵبکەوە و قۆڵەکانت لەژێر شانت لەسەر زەوی دابنێ.',
      'پەنجەکانی پێت بچەقێنە و هەموو جەستەت لە زەوی بەرز بکەرەوە.',
      'لاشەت وەکو دارتەختەیەک لە سەرەوە تا پاژنەی پێت بە ڕێکی ڕابگرە.',
      'ماسولکەکانی سکت توند بکە و بە شێوەیەکی ئارام هەناسە بدە.'
    ],
    instructionsKm: [
      'Li ser zik razê û zendên xwe li bin milên xwe deyne ser erdê.',
      'Bedenê xwe ji erdê hilde jor û xetek rast ji serî heta panîyan çêbike.',
      'Zikê xwe zexm bike û bi aramî bêhna xwe bistîne.'
    ],
    commonMistakesEn: [
      'Allowing hips to drop and sag toward the floor.',
      'Poking glutes up toward the ceiling.',
      'Holding your breath instead of steady breathing.'
    ],
    commonMistakesKu: [
      'داکەوتنی کەمەر بەرەو زەوی.',
      'زۆر بەرزکردنەوەی سمت بەرەو سەرەوە.',
      'گرتنی هەناسە لەبری هەناسەدانی هێمن.'
    ],
    commonMistakesKm: [
      'Ketin an daxistina kemberê ber bi erdê ve.',
      'Zêde bilindkirina qûnê.',
      'Girtina bêhnê li şûna nefesstendina aram.'
    ],
    safetyTipsEn: [
      'Gaze downward at the floor between your hands to keep your neck neutral.',
      'Stop if you feel strain in your lumbar lower back.'
    ],
    safetyTipsKu: [
      'سەیری نێوان دەستەکانت بکە بۆ پاراستنی مل لە برینداربوون.',
      'ئەگەر ئازارت لە بەشی خوارەوەی پشتت هەست پێکرد کەمێک پشوو بدە.'
    ],
    safetyTipsKm: [
      'Li navbera destên xwe binêre da ku stûyê te zirarê nebîne.',
      'Heger di pişta jêrîn de êş hebe tavilê raweste.'
    ],
    defaultDurationSec: 40,
    isRepsBased: false,
    caloriesBurnedPerMin: 6
  },
  {
    id: 'mountain_climbers',
    nameEn: 'Mountain Climbers',
    nameKu: 'شاخەوانی (ڕاکردنی زەوی)',
    nameKm: 'Mountain Climbers (Çiyagerî)',
    muscleGroup: 'cardio',
    difficulty: 'intermediate',
    animationType: 'mountain_climbers',
    instructionsEn: [
      'Start in a high plank position with shoulders directly above your wrists.',
      'Drive your right knee up toward your chest as fast and smoothly as possible.',
      'Quickly switch legs by bringing the right back and driving the left knee forward.',
      'Maintain a stable torso and flat back as you alternate in a running tempo.'
    ],
    instructionsKu: [
      'لە دۆخی شناوی بەرز دەست پێبکە، دەستەکان لەژێر شانت بن.',
      'ئەژنۆی ڕاستت بە خێرایی بەرەو سنگت ڕابکێشە.',
      'بە خێرایی قاچەکانت بگۆڕە و ئەژنۆی چەپت بەرەو پێشەوە بهێنە.',
      'پشتت بە ڕێکی ڕابگرە و بە خێرایی بەردەوامبە وەکو ڕاکردن.'
    ],
    instructionsKm: [
      'Di pozîsyona planka bilind de bisekine.',
      'Çoka xwe ya rastê zû bikişîne ber sînga xwe.',
      'Zû lingan biguherîne û mîna bazdanê berdewam bike.',
      'Pişta xwe rast bigire û lezê zêde bike.'
    ],
    commonMistakesEn: [
      'Bouncing hips too high in the air.',
      'Letting shoulders drift backward away from hands.',
      'Landing heavily on toes.'
    ],
    commonMistakesKu: [
      'بەرزکردنەوە و جوڵاندنی زۆری سمت بەرەو سەرەوە.',
      'گەڕانەوەی شان بەرەو دواوە لەسەر دەستەکان.',
      'دانانی توندی پەنجەکانی پێ لەسەر زەوی.'
    ],
    commonMistakesKm: [
      'Zêde bilindkirina kemberê.',
      'Dûrbûna milan ji ser destan.',
      'Lêdana hişk a tiliyên lingê li erdê.'
    ],
    safetyTipsEn: [
      'Prioritize a controlled rhythm and core tension over pure speed.',
      'Keep wrists protected by distributing pressure across the whole palm.'
    ],
    safetyTipsKu: [
      'تەرکیز لەسەر جێگیری لەش و سکت بکە زیاتر لە خێرایی زۆر.',
      'پەستانی لەش بە یەکسانی بەسەر هەموو دەستت دابەش بکە بۆ پاراستنی مەچەک.'
    ],
    safetyTipsKm: [
      'Zêdetir bala xwe bide ser hevsengî û zikê xwe ne tenê li ser lezê.',
      'Zextê li ser kefa destan belav bike.'
    ],
    defaultDurationSec: 30,
    isRepsBased: false,
    caloriesBurnedPerMin: 11
  },
  {
    id: 'jumping_jacks',
    nameEn: 'Jumping Jacks',
    nameKu: 'بازدانی پەپوولەیی',
    nameKm: 'Jumping Jacks (Baza Çalak)',
    muscleGroup: 'cardio',
    difficulty: 'beginner',
    animationType: 'jumping_jacks',
    instructionsEn: [
      'Stand with feet together and arms relaxed at your sides.',
      'Jump feet outward while raising arms simultaneously above your head.',
      'Immediately jump back to the starting stance with feet together and arms down.',
      'Keep your knees soft and bounce lightly on the balls of your feet.'
    ],
    instructionsKu: [
      'بە ڕێکی ڕابوەستە پێیەکانت لە تەنیشت یەکتر و دەستەکان لە لات بن.',
      'بازبدە و پێیەکانت بکەرەوە و لە هەمان کاتدا دەستەکانت لەسەرووی سەرت بەرز بکەرەوە.',
      'دەستبەجێ بازبدەرەوە بۆ دۆخی سەرەتایی پێیەکانت بنووسێنە پێکەوە.',
      'لەسەر سەرپەنجەکانت بە نەرمی بازبدە بۆ ئەوەی ئەژنۆکانت ئازار نەبینن.'
    ],
    instructionsKm: [
      'Lingan li ba hev deyne û destan berde binê laş.',
      'Bi bazdan lingan veke û destên xwe li ser serê xwe bilind bike.',
      'Dîsa bi bazdan vegere pozîsyona sereke.',
      'Li ser tiliyên lingan bi nermî bibaze.'
    ],
    commonMistakesEn: [
      'Landing hard with locked, stiff knees.',
      'Incomplete arm sweeps.',
      'Slouching the upper back.'
    ],
    commonMistakesKu: [
      'نیشتنەوەی توند بە ئەژنۆی ڕەق و بەستوو.',
      'بەرزنەکردنەوەی تەواوی دەستەکان بۆ سەرووی سەر.',
      'کۆمبوونی بەشی سەرەوەی پشت.'
    ],
    commonMistakesKm: [
      'Ketin bi çokên hişk li ser erdê.',
      'Bilindnekirina tam a destan.',
      'Xwarbûna pişta jorîn.'
    ],
    safetyTipsEn: [
      'Wear supportive sneakers or practice on a shock-absorbing exercise mat.',
      'Low impact option: Step side-to-side without jumping if needed.'
    ],
    safetyTipsKu: [
      'پێڵاوی وەرزشی یان دۆشەکی وەرزشی نەرم بەکاربهێنە.',
      'ئەگەر بازدان گران بوو دەتوانیت بە بێ بازدان هەنگاو بنێیتە لایەکان.'
    ],
    safetyTipsKm: [
      'Pêlavên baş li xwe bike an li ser xalîçeya werzîşê bike.',
      'Heger pêwîst be bê bazdan gav bavêje aliyan.'
    ],
    defaultDurationSec: 35,
    isRepsBased: false,
    caloriesBurnedPerMin: 10
  },
  {
    id: 'burpees',
    nameEn: 'Full Burpees',
    nameKu: 'بێرپیز (ڕاهێنانی گشتگیر)',
    nameKm: 'Burpees (Tevgera Tevahî)',
    muscleGroup: 'full_body',
    difficulty: 'advanced',
    animationType: 'burpees',
    instructionsEn: [
      'Stand with feet hip-width apart and lower into a deep squat position.',
      'Place hands on the floor in front of you and kick your feet back into a plank.',
      'Quickly lower your body or drop chest, then push up and jump your feet back forward.',
      'Explode upward in a dynamic jump with hands reaching overhead.'
    ],
    instructionsKu: [
      'بە پێوە ڕابوەستە و دانیشە بە دۆخی سکوات.',
      'دەستەکانت لەسەر زەوی دابنێ و بە خێرایی قاچەکانت بهاوێ بۆ دواوە بۆ دۆخی شناو.',
      'سنگت دابەزێنە و پاشان پاڵبنێ بەرەو سەرەوە و قاچەکانت بهێنەرەوە پێشەوە.',
      'بە هێزەوە بازبدە بەرەو ئاسمان و دەستەکانت بەرەو سەرەوە بەرز بکەرەوە.'
    ],
    instructionsKm: [
      'Seranser bisekine û dakeve pozîsyona skwat.',
      'Destan deyne ser erdê û lingan ber bi paş ve biavêje bo plankê.',
      'Sînga xwe daxe, vegere jor û lingan bîne pêş.',
      'Bi hêz ber bi jor ve bibaze û destan bilind bike.'
    ],
    commonMistakesEn: [
      'Arching lower back during the kickback.',
      'Landing heavily without bending knees.',
      'Pacing too quickly and losing breathing cadence.'
    ],
    commonMistakesKu: [
      'چەمانەوەی نادروستی پشت لە کاتی فڕێدانی قاچەکان بۆ دواوە.',
      'نیشتنەوەی توند بە بێ چەمانەوەی ئەژنۆ.',
      'خێراکردنی لە ڕادەبەدەر و لەدەستدانی کۆنتڕۆڵی هەناسە.'
    ],
    commonMistakesKm: [
      'Xwarbûna pişta jêrîn.',
      'Ketin bi çokên hişk.',
      'Zû windakirina hevsengiya bêhnê.'
    ],
    safetyTipsEn: [
      'Step back one foot at a time if jumping puts too much strain on your joints.',
      'Land softly by flexing hips and knees.'
    ],
    safetyTipsKu: [
      'دەتوانیت یەک بە یەک قاچەکانت بەریتە دواوە ئەگەر بازدان فشاری خستە سەر جومگەکانت.',
      'لە کاتی نیشتنەوەدا ئەژنۆکانت کەمێک بچەمێنەرەوە تا زەبرەکە هەڵمژێت.'
    ],
    safetyTipsKm: [
      'Dikarî ling bi ling biçî paş heger bazdan zehmet be.',
      'Bi nermî xwe deyne erdê bi çemîna çokan.'
    ],
    defaultDurationSec: 30,
    defaultReps: 10,
    isRepsBased: true,
    caloriesBurnedPerMin: 13
  },
  {
    id: 'situps',
    nameEn: 'Core Sit Ups',
    nameKu: 'دانیشتن و پاڵکەوتنی سک',
    nameKm: 'Sit Ups (Zikê Berz)',
    muscleGroup: 'abs',
    difficulty: 'intermediate',
    animationType: 'situps',
    instructionsEn: [
      'Lie on your back with knees bent at 90 degrees and feet planted flat on the floor.',
      'Place hands gently across your chest or behind your ears without pulling the neck.',
      'Contract your abdominal muscles to elevate your torso fully toward your knees.',
      'Lower yourself back down slowly under controlled tension.'
    ],
    instructionsKu: [
      'لەسەر پشت پاڵبکەوە، ئەژنۆکانت بچەمێنەرەوە و پێیەکانت لەسەر زەوی بچەقێنە.',
      'دەستەکانت لەسەر سنگت دابنێ یان لە تەنیشت گوێیەکانت بێ ئەوەی ملی خۆت ڕابکێشیت.',
      'ماسولکەکانی سکت گرژ بکە و بەشی سەرەوەی لاشەت بەرز بکەرەوە بەرەو ئەژنۆکانت.',
      'بە هێواشی و بە کۆنتڕۆڵ لاشەت دابەزێنەرەوە بۆ سەر زەوی.'
    ],
    instructionsKm: [
      'Li ser piştê razê, çokan biçemîne û lingan deyne erdê.',
      'Destan deyne ser sîngê an li ba guhan bê kişandina stû.',
      'Zikê xwe zexm bike û ber bi çokan ve rabe ser xwe.',
      'Bi kontrol û hêdîka vegere erdê.'
    ],
    commonMistakesEn: [
      'Yanking your neck forward with your hands.',
      'Lifting feet off the ground during the ascent.',
      'Dropping back down abruptly without muscle control.'
    ],
    commonMistakesKu: [
      'ڕاکێشانی توندی مل بە دەستەکان.',
      'بەرزبوونەوەی پێیەکان لەسەر زەوی لە کاتی هەستاندا.',
      'کەوتنی خێرای لاشە بۆ خوارەوە بە بێ کۆنتڕۆڵی ماسولکە.'
    ],
    commonMistakesKm: [
      'Kişandina stû bi destan.',
      'Bilindbûna lingan ji ser erdê.',
      'Ketin bê kontrol ber bi paş ve.'
    ],
    safetyTipsEn: [
      'Fix your gaze forward and maintain space between your chin and chest.',
      'Do crunches instead if you suffer from lower back disc discomfort.'
    ],
    safetyTipsKu: [
      'سەیری پێشەوە بکە و بۆشایی لە نێوان چەناگە و سنگت بهێڵەرەوە.',
      'ئەگەر ئازاری پشتت هەیە لەبری دانیشتنی تەواو کەمێک سکت بەرز بکەرەوە.'
    ],
    safetyTipsKm: [
      'Navbera çene û sîngê vekirî bihêle.',
      'Heger êşa piştê hebe tevgerên kurtir bike.'
    ],
    defaultDurationSec: 30,
    defaultReps: 15,
    isRepsBased: true,
    caloriesBurnedPerMin: 7
  },
  {
    id: 'bicycle_crunches',
    nameEn: 'Bicycle Crunches',
    nameKu: 'سکی پاسکیلی (پەستانی پێچاوپێچ)',
    nameKm: 'Bicycle Crunches (Bîsîkleta Zik)',
    muscleGroup: 'abs',
    difficulty: 'intermediate',
    animationType: 'bicycle_crunches',
    instructionsEn: [
      'Lie on your back with knees elevated at tabletop angle and hands behind head.',
      'Lift shoulders off the mat and extend your right leg straight out.',
      'Rotate your torso to bring your right elbow toward your bent left knee.',
      'Switch smoothly by bringing the right knee in and rotating left elbow across.'
    ],
    instructionsKu: [
      'لەسەر پشت پاڵبکەوە، ئەژنۆکانت بەرز بکەرەوە و دەستەکانت بخەرە پشت سەرت.',
      'شانت لە زەوی بەرز بکەرەوە و قاچی ڕاستت بە ڕێکی درێژ بکە.',
      'لاشەت بسوڕێنە و ئانیشکی ڕاستت بگەیەنە بە ئەژنۆی چەپت.',
      'بە هێمنی جێگۆڕکێ بکە و ئانیشکی چەپت ببە بۆ ئەژنۆی ڕاستت.'
    ],
    instructionsKm: [
      'Li ser piştê razê û çokan bilind bike.',
      'Mila xwe ji erdê hilde û lingê rastê dirêj bike.',
      'Enîşka rastê bibe ser çoka çepê.',
      'Wekî ajotina bîsîkletê bi nermî bidomîne.'
    ],
    commonMistakesEn: [
      'Rushing through the movement without deliberate rotation.',
      'Pulling on the back of the neck.',
      'Letting the extended leg touch the ground.'
    ],
    commonMistakesKu: [
      'خێراکردنی جوڵەکە بەبێ سوڕاندنی تەواوی ناوقەد.',
      'ڕاکێشانی مل بە دەست.',
      'بەرکەوتنی قاچی درێژکراو لە زەوی.'
    ],
    commonMistakesKm: [
      'Lezkirina tevgerê bê zivirandina tam.',
      'Kişandina stû bi destan.',
      'Gihandina lingê dirêjkirî bi erdê.'
    ],
    safetyTipsEn: [
      'Focus on full torso rotation rather than touching elbows to knees.',
      'Breathe rhythmically with each twist.'
    ],
    safetyTipsKu: [
      'تەرکیز لەسەر سوڕاندنی ماسولکەی ناوقەد بکە نەک تەنها دەستلێدانی ئانیشک بە ئەژنۆ.',
      'لەگەڵ هەر سوڕانێکدا هەناسە بدە.'
    ],
    safetyTipsKm: [
      'Zêdetir bala xwe bide ser zivirandina navtengê.',
      'Bi her zivirînê re bêhna xwe bistîne.'
    ],
    defaultDurationSec: 30,
    defaultReps: 20,
    isRepsBased: true,
    caloriesBurnedPerMin: 9
  },
  {
    id: 'glute_bridge',
    nameEn: 'Glute Bridge',
    nameKu: 'پردی سمت و ڕان',
    nameKm: 'Glute Bridge (Pira Qûnê)',
    muscleGroup: 'glutes',
    difficulty: 'beginner',
    animationType: 'glute_bridge',
    instructionsEn: [
      'Lie flat on your back with knees bent and feet flat on the floor, hip-width apart.',
      'Rest your arms straight along your sides with palms flat.',
      'Squeeze your glutes and press through your heels to raise hips toward the ceiling.',
      'Hold at the top for a count of two, then slowly lower back to the mat.'
    ],
    instructionsKu: [
      'لەسەر پشت پاڵبکەوە، ئەژنۆکانت بچەمێنەرەوە و پێیەکانت بە پانی کەمەرت لەسەر زەوی دابنێ.',
      'دەستەکانت بە درێژایی لاشەت لەسەر زەوی ڕابگرە.',
      'سمتت توند بکە و لە ڕێگەی پاژنەی پێتەوە کەمەرت بەرەو سەرەوە بەرز بکەرەوە.',
      'بۆ ماوەی دوو چرکە لە سەرەوە ڕایبگرە و پاشان بە هێواشی دابەزە.'
    ],
    instructionsKm: [
      'Li ser piştê razê û çokan biçemîne, lingan deyne ser erdê.',
      'Destên xwe li tenişta xwe deyne.',
      'Qûna xwe zexm bike û bi hêza panîyan kemberê ber bi jor ve bilind bike.',
      'Du çirkeyan li jor bisekine û hêdîka dakeve.'
    ],
    commonMistakesEn: [
      'Hyperextending the lower back rather than lifting from the glutes.',
      'Pushing through the toes instead of the heels.',
      'Not squeezing glutes at the peak of contraction.'
    ],
    commonMistakesKu: [
      'زۆر چەمانەوەی پشت لەبری بەکارهێنانی ماسولکەی سمت.',
      'پاڵنان بە سەرپەنجەی پێ لەبری پاژنە.',
      'توندنەکردنی ماسولکەی سمت لە لوتکەی بەرزبوونەوەدا.'
    ],
    commonMistakesKm: [
      'Zêde qewisandina pişta jêrîn.',
      'Pêldana tiliyên lingan li şûna panîyan.',
      'Tundnekirina qûnê di dema bilindbûnê de.'
    ],
    safetyTipsEn: [
      'Keep your ribs pulled down and engage your core throughout.',
      'Great warm-up and activation for sedentary desk workers.'
    ],
    safetyTipsKu: [
      'سکت توند بکە بۆ پاراستنی پشتی خوارەوە.',
      'ڕاهێنانێکی ناوازەیە بۆ کەسانێک کە زۆر دادەنیشن لە کاتی کارکردندا.'
    ],
    safetyTipsKm: [
      'Zikê xwe zexm bigire da ku pişta jêrîn biparêzî.',
      'Ji bo kesên ku zêde rûdinên tevgerke pir baş e.'
    ],
    defaultDurationSec: 35,
    defaultReps: 15,
    isRepsBased: true,
    caloriesBurnedPerMin: 6
  },
  {
    id: 'high_knees',
    nameEn: 'High Knees',
    nameKu: 'بەرزکردنەوەی ئەژنۆکان (ڕاکردنی بەرز)',
    nameKm: 'High Knees (Çokên Bilind)',
    muscleGroup: 'cardio',
    difficulty: 'intermediate',
    animationType: 'high_knees',
    instructionsEn: [
      'Stand tall with feet hip-distance apart and arms bent at 90 degrees.',
      'Quickly drive your right knee upward toward hip height.',
      'Land lightly on the ball of your foot and immediately drive the left knee up.',
      'Pump your arms in rhythm to accelerate heart rate and elevate core engagement.'
    ],
    instructionsKu: [
      'بە ڕێکی ڕابوەستە و باڵەکانت لە گۆشەی ٩٠ پلە بچەمێنەرەوە.',
      'بە خێرایی ئەژنۆی ڕاستت بەرەو ئاستی کەمەرت بەرز بکەرەوە.',
      'بە نەرمی لەسەر سەرپەنجە بنیشەرەوە و دەستبەجێ ئەژنۆی چەپت بەرز بکەرەوە.',
      'دەستەکانت بە هاوسەنگی بجوڵێنە بۆ خێراکردنی لێدانی دڵ و سووتاندنی چەوری.'
    ],
    instructionsKm: [
      'Rast bisekine û milên xwe bi goşeya 90 pileyî biçemîne.',
      'Çoka xwe ya rastê zû ber bi kemberê ve bilind bike.',
      'Bi nermî dakeve û çoka çepê bilind bike.',
      'Destên xwe bi hevsengî bilivîne da ku lêdana dil zêde bibe.'
    ],
    commonMistakesEn: [
      'Leaning backward to compensate for lack of knee height.',
      'Stamping feet loudly onto the floor.',
      'Letting arms swing erratically.'
    ],
    commonMistakesKu: [
      'چوونە دواوەی لاشە لە کاتی بەرزکردنەوەی ئەژنۆکاندا.',
      'کێشانی توندی پێ بە زەویدا بە دەنگێکی بەرز.',
      'جوڵانی ناتەبای دەستەکان.'
    ],
    commonMistakesKm: [
      'Ketin ber bi paş ve.',
      'Lêdana hişk a lingan li ser erdê.',
      'Livandina bêserûber a destan.'
    ],
    safetyTipsEn: [
      'Stay light on your toes like an athlete skipping rope.',
      'March with high knees without jumping for low-impact joint care.'
    ],
    safetyTipsKu: [
      'لەسەر پەنجەکانت سووکبە وەکو وەرزشکاری گوریس بازدان.',
      'دەتوانیت بەبێ بازدان تەنها ئەژنۆت بەرز بکەیتەوە ئەگەر جومگەکانت ناسک بن.'
    ],
    safetyTipsKm: [
      'Wekî werzîşvanekî li ser serê tiliyên lingan sivik be.',
      'Heger hestî biêşin bê bazdan çokan bilind bike.'
    ],
    defaultDurationSec: 30,
    isRepsBased: false,
    caloriesBurnedPerMin: 12
  },
  {
    id: 'cobra_stretch',
    nameEn: 'Cobra & Spine Stretch',
    nameKu: 'ڕاکێشانی کۆبرا (نەرمی پشت و سنگ)',
    nameKm: 'Cobra Stretch (Nermkirina Piştê)',
    muscleGroup: 'stretching',
    difficulty: 'beginner',
    animationType: 'stretching',
    instructionsEn: [
      'Lie face down on the mat with legs extended straight behind you.',
      'Place your palms flat on the floor directly beneath your shoulders.',
      'Gently press into your hands to lift your chest, arching your upper back.',
      'Keep shoulders drawn away from ears and breathe deeply for 30 seconds.'
    ],
    instructionsKu: [
      'لەسەر دەم پاڵبکەوە و قاچەکانت بە ڕێکی درێژ بکە بۆ دواوە.',
      'کەفی دەستەکانت لەژێر شانت لەسەر زەوی دابنێ.',
      'بە هێمنی فشار بخەرە سەر دەستەکانت و سنگت بەرز بکەرەوە و بەشی سەرەوەی پشتت بچەمێنەرەوە.',
      'شانت لە گوێچکەکانت دوور بخەرەوە و بۆ ماوەی ٣٠ چرکە بە قووڵی هەناسە بدە.'
    ],
    instructionsKm: [
      'Li ser zik razê û lingên xwe ber bi paş ve dirêj bike.',
      'Kefa destên xwe li bin milan deyne ser erdê.',
      'Bi nermî xwe hilde jor û sînga xwe bilind bike.',
      'Mila ji guhan dûr bigire û bi kûrî bêhnê bistîne.'
    ],
    commonMistakesEn: [
      'Compressing the lower back aggressively.',
      'Shrugging shoulders up around the neck.',
      'Hyperextending the neck backwards.'
    ],
    commonMistakesKu: [
      'فشاری زۆر لەسەر بەشی خوارەوەی پشت.',
      'بەرزکردنەوەی شان بەرەو گوێچکەکان.',
      'شکاندنەوەی زۆری مل بۆ دواوە.'
    ],
    commonMistakesKm: [
      'Zexta zêde li ser pişta jêrîn.',
      'Bilindkirina milan ber bi guhan ve.',
      'Zêde tewandina stû ber bi paş ve.'
    ],
    safetyTipsEn: [
      'Only lift as high as comfortable; do not force range of motion.',
      'Keep your pelvis anchored to the floor.'
    ],
    safetyTipsKu: [
      'تەنها بەو ئەندازەیە بەرزبەرەوە کە هەست بە ئارامی دەکەیت.',
      'حەوزت لەسەر زەوی بهێڵەرەوە.'
    ],
    safetyTipsKm: [
      'Tenê heta astek ku xwe rehet hîs dikî bilind bibe.',
      'Hêza kemberê li ser erdê bihêle.'
    ],
    defaultDurationSec: 30,
    isRepsBased: false,
    caloriesBurnedPerMin: 4
  }
];
