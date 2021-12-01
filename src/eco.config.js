module.exports = {
    apps : [
        {
            name: "core",
            script: "src/app.js",
            watch: true,
            env_local: {
                "NODE_ENV": "development",
                "NEWS_ADMIN_USER_ID" : "60e2ea4bf47f8a49c28bc106",
                "NEWS_CHANNEL_ID" : "60e2ea25187b9d49d78c5905",
                "CRON_SCHEDULE":"*/30 * * * * *"
            },
            env_production: {
                "NODE_ENV": "production",
                "NEWS_ADMIN_USER_ID" : "",
                "NEWS_CHANNEL_ID" : "",
                "CRON_SCHEDULE":"*/10 * * * * *"

            },
            env_test: {
                "NODE_ENV": "test",
                "NEWS_ADMIN_USER_ID" : "60e2ea4bf47f8a49c28bc106",
                "NEWS_CHANNEL_ID" : "60e2ea25187b9d49d78c5905",
                "CRON_SCHEDULE":"*/30 * * * * *"
            }
        }
    ]
}
