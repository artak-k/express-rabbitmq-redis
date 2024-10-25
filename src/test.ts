// import { actions, notification_routes } from "./config/constants"
// import { Notification } from "./utils/notification"

// const tasks = [
//     {
//         "taskType": "regular",
//         "priority": 1,
//         "content": {
//             "task": {
//                 "user": {
//                     "name": "First",
//                     "age": 20
//                 }
//             }
//         }
//     },
//     {
//         "taskType": "regular",
//         "priority": 2,
//         "content": {
//             "task": {
//                 "user": {
//                     "name": "Second",
//                     "age": 20
//                 }
//             }
//         }
//     },
//     {
//         "taskType": "regular",
//         "priority": 3,
//         "content": {
//             "task": {
//                 "user": {
//                     "name": "third",
//                     "age": 20
//                 }
//             }
//         }
//     },
//     {
//         "taskType": "regular",
//         "priority": 4,
//         "content": {
//             "task": {
//                 "user": {
//                     "name": "fourth",
//                     "age": 20
//                 }
//             }
//         }
//     },
//     {
//         "taskType": "regular",
//         "priority": 5,
//         "content": {
//             "task": {
//                 "user": {
//                     "name": "John",
//                     "age": 20
//                 }
//             }
//         }
//     },
//     // {
//     //     "taskType": "full-sync",
//     //     "priority": 6,
//     //     "content": {
//     //         "task": {
//     //             "user": {
//     //                 "name": "John",
//     //                 "age": 20
//     //             }
//     //         }
//     //     }
//     // },
//     {
//         "taskType": "regular",
//         "priority": 7,
//         "content": {
//             "task": {
//                 "user": {
//                     "name": "John",
//                     "age": 20
//                 }
//             }
//         }
//     },
//     {
//         "taskType": "regular",
//         "priority": 8,
//         "content": {
//             "task": {
//                 "user": {
//                     "name": "John",
//                     "age": 20
//                 }
//             }
//         }
//     },
//     {
//         "taskType": "regular",
//         "priority": 9,
//         "content": {
//             "task": {
//                 "user": {
//                     "name": "John",
//                     "age": 20
//                 }
//             }
//         }
//     },
//     {
//         "taskType": "regular",
//         "priority": 10,
//         "content": {
//             "task": {
//                 "user": {
//                     "name": "John",
//                     "age": 20
//                 }
//             }
//         }
//     },
//     {
//         "taskType": "regular",
//         "priority": 11,
//         "content": {
//             "task": {
//                 "user": {
//                     "name": "John",
//                     "age": 20
//                 }
//             }
//         }
//     },
//     // {
//     //     "taskType": "full-sync",
//     //     "priority": 2,
//     //     "content": {
//     //         "task": {
//     //             "user": {
//     //                 "name": "John",
//     //                 "age": 20
//     //             }
//     //         }
//     //     }
//     // }
// ]

// export const startTests = async () => {
//     for (const task of tasks) {
//       await  Notification.send(notification_routes.task, { action: actions.taskCreate, data: task })
//     }
// }