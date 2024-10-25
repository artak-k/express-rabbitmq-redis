export const actions = {
    adminCreate: "admin-create",
    adminUpdate: "admin-update",
    adminDelete: "admin-delete",
    adminGet: "admin-get",
    adminGetAll: "admin-get-all",
    taskCreate: "task-create",
} as const;

export const taskType = {
   regular: "regular",
   fullSync: "full-sync"
} as const

export const notification_routes = {
    admin: 'admin',
    task: 'task'
} as const