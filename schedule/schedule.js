import cron from "node-cron"


const task = cron.schedule('* * * * * *', async () => {
    console.log('cron: ', new Date());
})

// task.start()