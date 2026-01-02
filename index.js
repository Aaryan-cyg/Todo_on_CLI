const { Command }= require ('commander');
const program= new Command();
const fs=require('fs');

program
.name('ClI based ToDo')
.description('create a todo ')
.version('1.0.0')

const path = 'db.json';

program.command('add')
.description('add todos in the list.')
.argument('<text>','todo to be added')
// .argument('<File>','database path')
.action((text)=>{
    let todos=[];
    try{
        if(fs.existsSync(path)){
            const fileData=fs.readFileSync(path,'utf-8')
            if(fileData.trim() !==""){
                todos=JSON.parse(fileData);
            }
        }
    }
    catch(error){
        console.log("file path does not exist ")
        todos=[]
    }

    const newTask={
        id: todos.length+1,
        title: text,
    }
    todos.push(newTask);
    try{
        fs.writeFileSync(path,JSON.stringify(todos,null,2));
        console.log(`Success! Added task: "${text}"`);
    }
    catch(error){
        console.log(error);
    }
})

program.command('fetch')
.description('Fetch all the todos from the list')
// .argument('<File>','database path')
.action(()=>{
    fs.readFile(path,'utf-8',(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            try{
                 const fileData=fs.readFileSync(path,'utf-8')
            const fetchData= JSON.parse(fileData);
            // console.log(`${fetchData.id} ${fetchData.title}`);
            for(let i=0;i<fetchData.length;i++){
            console.log(`${fetchData[i].id} ${fetchData[i].title} `);
            }
            } catch(parseError){
                console.log(`Error: ${parseError.message}`)
            }
        }
    })
})


program.command('update')
.description('Update the todo from the list of given index')
.argument('<updIndex>','index to be updated')
.argument('<text>','the new updated todo')
.action((updIndex,text)=>{
    fs.readFile(path,'utf-8',(err,data)=>{
    if(err){
        console.log(err);
        return;
    }
        try{
            const fetchData= JSON.parse(data)
            fetchData[updIndex].title= text;
            const updatedString = JSON.stringify(fetchData, null, 2);
            fs.writeFile(path, updatedString, (writeErr) => {
    if (writeErr) {
        console.log("Could not update!");
    } else {
        console.log(`id: ${fetchData[updIndex].id} ${fetchData[updIndex].title} `);
        console.log("Update successful !!!!");
    }
    })
        }catch(parseError){
            console.log(`Error: ${parseError.message}`)
        }
})
})

program.command('delete')
.description('Delete todos from the list')
.argument('<updIndex>', 'index to delete')
.action((updIndex)=>{
   fs.readFile(path,'utf-8',(err,data)=>{
     if(err){
        console.log(err);
        return;
     }
     try{
        let todos =JSON.parse(data);
        const trgIndex=parseInt(updIndex)-1;
        if(trgIndex<0 || trgIndex>=todos.length){
            console.log("Invalid id Entered")
            return;
        }
     todos.splice(trgIndex,1)

     todos.forEach((todo,index) => {
        todo.id=index+1;
     });
     const updatedString=JSON.stringify(todos,null,2)
     fs.writeFile(path,updatedString,(writeErr)=>{
        if(writeErr){
            console.log("could not save changes")
        }
        else{
            console.log('success!! task deleted')
        }
     })
     }catch(parseError){
        console.log(`Error: ${parseError}`);
     }
   })
})


program.parse();