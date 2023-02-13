export const adminMenu = [
    { //hệ thống
        name: 'menu.system.header', menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage',
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },
            {
                name: 'menu.admin.manage-information-doctor', link: '/system/manage-information-doctors'

            },
            {
                name: 'menu.admin.manage-schedule-doctor', link: '/system/manage-schedule-doctors'
            },
            {
                name: 'menu.admin.manage-schedule-teledoctor', link: '/system/manage-schedule-teledoctors'
            },
            {
                name: 'menu.admin.manage-user', link: '/system/user-manage',
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin',
            },
            {
                name: 'menu.doctor.header', menus: [
                    {
                        name: 'menu.doctor.schedule', link: '/doctor/doctor-schedule'
                    }
                ]
            }
        ],
    },
    {
        name: 'menu.admin.remote-examination', menus: [
            {
                name: 'menu.admin.manage-remote-examination', link: '/system/manage-remote-examination',
            },

        ]
    },
    {
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specailty',
            },

        ]
    },
];
export const doctorMenu = [
    {
        name: 'menu.doctor.header', menus: [
            {
                name: 'menu.doctor.schedule', link: '/doctor/doctor-schedule'
            }
        ]
    }
]