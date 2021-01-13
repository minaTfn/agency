export default [
    {title: 'Manage Users', type: 'link', icon: 'mdi-account-group', link: '/users'},
    {title: 'Manage Agencies', type: 'link', icon: 'mdi-home-account', link: '/agencies'},
    {
        title: 'Goals',
        type: 'dropdown',
        icon: 'mdi-seal',
        dropDownItems: [
            {title: 'Manage Goals', link: '/goals'},
            {title: 'Manage Goal Profiles', link: '/goals/goal-profiles'},
        ]

    },
    {title: 'Manage Quarters', type: 'link', icon: 'mdi-calendar-month', link: '/quarters'},
    {
        title: 'Reports',
        type: 'dropdown',
        icon: 'mdi-chart-line',
        dropDownItems: [
            {title: 'Agency Overview', link: '/report/agency-overview'},
            {title: 'Agency Goal Details', link: '/report/agency-goal'},
            {title: 'User Overview', link: '/report/user-overview'},
            {title: 'User Goal Details', link: '/report/user-goal'},
        ]

    },
    {title: 'System Settings', type: 'link', icon: 'mdi-cog', link: '/settings'},
]
