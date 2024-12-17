const addbtn=document.querySelector("#addbtn");
const main=document.querySelector(".main")
const saveNote=()=>{
    const notes=document.querySelectorAll('.note textarea')
    const data=[]
    notes.forEach((note) => {
        data.push(note.value);
        console.log(data)
    });
    if (data.length===0) {
        localStorage.removeItem('notes')
    } else {
        localStorage.setItem('notes',JSON.stringify(data));
    }
    
}


const addNote=(text='')=>{
    const note=document.createElement('div');
    // note.classList.add("note");
    note.innerHTML=`
    <div class="note">
        <div class="tool">
            <i class="save fa-solid fa-floppy-disk"></i>
            <i class="trash fa-solid fa-trash"></i>
        </div>
        <textarea name="" id="">${text}</textarea>
    </div/>
    `;
    note.querySelector('textarea').addEventListener("focusout",function () {
        saveNote();
    })
    note.querySelector('.trash').addEventListener("click",()=>{
        note.remove()
        saveNote()
    })
    note.querySelector('.save').addEventListener("click",()=>{
        saveNote()
    })

    main.appendChild(note);
    saveNote()
}






(
    function () {
        const lsNotes=JSON.parse(localStorage.getItem('notes'));
        if (lsNotes==null) {
           addNote() 
        } else {
            lsNotes.forEach((lsnote)=>{
                addNote(lsnote);
            })
        }
        
        
    }
)()
addbtn.addEventListener("click",function () {
    addNote();
})