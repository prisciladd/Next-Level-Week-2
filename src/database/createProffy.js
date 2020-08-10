module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {
    //inserir dados na tabela de proffys
    //db.run().then() //then esperar rodar
    const insertedProffy = await db.run(`
        INSERT INTO proffys(
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
           " ${proffyValue.bio}",
        );
    `) //wait não precisa do then só usa com async
    const proffy_id = insertedProffy.lastID

    //inserir dados na tabela classes

    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id,
            ) VALUES (
                ${classValue.subject},
                ${classValue.cost},
                ${classValue.proffy_id}
            );    
            
            `)
    const class_id = insertedClass.lastID

    //inserir dados na tabela class_schedule
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
        INSERT INTO class_schedule(
            class_id, 
            weekday,
            time_from,
            time_to
        ) VALUES (
            ${class_id}
            ${classScheduleValue.weekday},
            ${classScheduleValue.time_from},
            ${classScheduleValue.time_to}
        )
        
        `)
    } )   //mapear array, map semelhante for each, cria um novo array

            //aqui vou executar todos db.runs() das classes schedules
            await Promise.all(insertedAllClassScheduleValues)
}