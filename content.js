/* ============================================================
   EDIT THIS FILE — it's the only one you need to touch to go live.
   Everything below is plain text. Save, refresh the page, done.
   ============================================================ */

window.SITE = {
  studioName: "Plainsight Studio",
  founderName: "Kazi Marzuk",
  location: "Dhaka, Bangladesh",

  // Contact. The form opens the visitor's email app addressed to this.
  email: "kazimarzuk25@gmail.com",
  whatsapp: "8801891966267",           // digits with country code. "" hides it.
  linkedin: "",                        // full URL. "" hides it.
  youtube: "",
  facebook: "",
  instagram: "https://www.instagram.com/atosh.kach/",   // the founder's editorial channel আতসকাচ (shown as a portfolio credit)

  // Proof strip under the hero. Production facts, not view counts.
  // Update as the channel grows; delete a line to hide it.
  stats: [
    { value: "14",   label: "animated explainers published" },
    { value: "4",    label: "topic series: AI, security, internet, money" },
    { value: "60–90s", label: "typical explainer length" },
    { value: "100%", label: "researched, written & animated in-house" }
  ],

  // Optional showreel: path to an MP4 in the site folder, e.g. "work/showreel.mp4". "" hides the button.
  showreel: "",

  /* Portfolio. Files live in site/work/ (made from AI Video Editor/jholok/out).
     category = ai | cyber | tech | money   (drives the filter buttons)
     title    = English title a client understands; bn = original Bangla title
     brief    = what the video makes clear, written like a case study line
     (The keyboard reel, ep10, is the featured case study in index.html, so it isn't repeated here.) */
  videos: [
    { file: "work/ep03.mp4", poster: "work/ep03.jpg", category: "ai",
      title: "ChatGPT doesn't actually know anything",
      bn: "ChatGPT আসলে কিছুই জানে না",
      brief: "How a language model writes: tokens, probabilities and next-word prediction, shown step by step." },
    { file: "work/ep08.mp4", poster: "work/ep08.jpg", category: "tech",
      title: "How Google Maps knows where the traffic is",
      bn: "Google Maps জানে কিভাবে কোথায় জ্যাম?",
      brief: "No cameras needed: crowdsourced phone location data, visualised on a live map of Dhaka." },
    { file: "work/ep05.mp4", poster: "work/ep05.jpg", category: "cyber",
      title: "Who can read your WhatsApp messages?",
      bn: "তোমার message কে কে পড়তে পারে?",
      brief: "End-to-end encryption: keys, locks and a message's journey, made concrete for everyday users." },
    { file: "work/ep11.mp4", poster: "work/ep11.jpg", category: "money",
      title: "Why the medium combo exists when nobody buys it",
      bn: "Combo র মাঝারিটা কেউ কেনে না, তবু রাখা হয়!",
      brief: "The decoy effect in pricing, explained through a fast-food menu everyone recognises." },
    { file: "work/ep06.mp4", poster: "work/ep06.jpg", category: "cyber",
      title: "Hackers don't break the lock, they break you",
      bn: "Hacker রা তালা ভাঙে না, তোমাকে ভাঙে",
      brief: "Why mobile-banking scams target people instead of encryption: social engineering, step by step." },
    { file: "work/ep13.mp4", poster: "work/ep13.jpg", category: "money",
      title: "How is a 10-taka chip packet still 10 taka?",
      bn: "১০ টাকার চিপস আজও ১০ টাকা কীভাবে?",
      brief: "Shrinkflation: how prices stay the same while the product quietly shrinks." },
    { file: "work/ep09.mp4", poster: "work/ep09.jpg", category: "tech",
      title: "Can a new road make traffic worse?",
      bn: "নতুন রাস্তা বানালে জ্যাম বাড়ে?",
      brief: "Braess's paradox as an animated network-flow story: data storytelling for a counter-intuitive idea." },
    { file: "work/ep04.mp4", poster: "work/ep04.jpg", category: "ai",
      title: "Nobody taught the AI the rules",
      bn: "AI কে কেউ শেখায়নি",
      brief: "How training works: billions of knobs, endless mistakes and tiny corrections, made visible." }
  ]
};
