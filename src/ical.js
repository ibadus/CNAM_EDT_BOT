const { execute } = require("./delete");

module.exports = {
    execute (fs, ical, webhook, date, moment, path_file, webhookurl){
        var data = ical.parseFile(path_file);

        for (var UID in data) {
            
            var event = data[UID]
            if (event.type === 'VEVENT') {
                // Calculate the duration of the event for use with recurring events.
                try {
                    var startDate = moment(event.start);
                    var endDate = moment(event.end);
                    var duration = moment.duration(parseInt(endDate.format("x")) - parseInt(startDate.format("x"))).humanize();
                    var formated_startDateH = startDate.format('Do MMMM, HH:mm');
                    var formated_endDateH = endDate.format('Do MMMM, HH:mm');
                    var formated_starthour = startDate.format('HH:mm')
                    var formated_endhour = endDate.format('HH:mm')
                    var formated_date = startDate.format('Do MMMM')
                } catch (err) {
                    console.error('TIME ERROR, error message :\n' + err);
                };

                // GET DAY DATE
                var day = new Date();
                // GET NEXT DAY DATE
                var nextDay = new Date(day);
                nextDay.setDate(day.getDate() + 1);
                // CONVERT DATE TO D/M
                var day = moment(day).format('Do MMMM');
                var nextDay = moment(nextDay).format('Do MMMM');

                if (formated_date === nextDay) {
                    console.log('YAAAAAAAAAAAAAAAAY');
                    const Hook =  new webhook.Webhook(webhookurl);
                    const msg = new webhook.MessageBuilder()
                        .setName('EDT Groupe 1')
                        .setColor('#aabbcc')
                        .setTitle('EDT du: ' + nextDay)
                        .setDescription('**' + event.summary + '**' + '\n\n' + event.location + '\n' + 'Horaires: ' + formated_starthour + ' - ' + formated_endhour)
                    Hook.send(msg);
                    console.log('Webhook successfully sent');
                };
                //console.log(`${event.summary} \nStart at: ${formated_startDateH} \nEnd at: ${formated_endDateH}\nDuratinon :  ${duration} \nLocation: ${event.location}`);
            };
        };
    },
};
