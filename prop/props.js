
let AddNotes = [];
let AttendeanceArray = [];
let leavesArray = [];
let Namepass={};
const getmain = () => {
    return AddNotes;
}
const getAttendance = () => {
    return AttendeanceArray;
}
const getleaves = () => {
    return leavesArray;
}

const setMain = (object) => {
    AddNotes.push(object)
}
const DeletNotes = (Value) => {
    AddNotes.splice(Value, 1);
}
const SetDiscription = (value, Discription) => {
    AddNotes[value].Discription = Discription;
}
const setAttendance = (date) => {
    AttendeanceArray=date  
}

const getNamePass=()=>{
    return Namepass
}

const setNamePass=(object)=>{
Namepass= object;
}
const setleaves = () => {
    var result = AttendeanceArray.sort(function(a,b){
        return Date(a.date) - Date(b.date);
     }).reduce(function(hash){

       return function(p,c){
        

         var missingDaysNo = (Date.parse(c.date) - hash.prev) / (1000 * 3600 * 24);
         if(hash.prev && missingDaysNo > 1) {
           for(var i=1;i<missingDaysNo;i++)
             p.push(new Date(hash.prev+i*(1000 * 3600 * 24)));
         }
         hash.prev = Date.parse(c.date);
         return p;
       };
     }(Object.create(null)),[]);
     leavesArray=result;
}

export { setMain, getmain, SetDiscription, DeletNotes, setAttendance, getAttendance, setleaves ,getleaves,setNamePass,getNamePass}