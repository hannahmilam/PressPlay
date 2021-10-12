import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  /** @type {import('.model/Project.js').Project[]} */
  projects: [],
  project: {},
  /** @type {import('.model/ProjectSubscriptions.js').ProjectSubscriptions[]} */
  projectSubscriptions: [],
  projectSubscribers: [],
  /** @type {import('.model/Profile.js').Profile[]} */
  profile: [],
  currentProfile: {},
  /** @type {import('.model/ProfileSubscriptions.js').ProfileSubscriptions[]} */
  profileSubscriptions: [],
  profileSubscribers: [],
  /** @type {import('.model/Comments.js').Comments[]} */
  comments: [],
  /** @type {import('.model/Contribution.js').Contribution[]} */
  contributions: []
})
