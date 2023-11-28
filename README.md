# Steps to Follow:

## 1. Download the zip file to your system.

## 2. Extract all the files in a folder and open it in VS Code.

## 3. After Opening the respective folder in VS Code, open new terminal (Shift + Ctrl + `) and run the command "npm run start".

# Live Demo
The website has been deployed on render.com (link: https://taskify-dx37.onrender.com) But it is really unstable at the moment and may not load on the system.

# Responsive
The website is responsive and can be used in both mobile phones and laptops.

## Ques 1: How long did you spend on the coding test? 
Answer: Honestly it took me 7hrs to create the project but if i include the front end portion then 8hrs
figma link : https://www.figma.com/file/QfKuIQmTP2WIUGkcIj0aYu/Untitled?type=design&node-id=0%3A1&mode=design&t=PbVTB8tVJBLDXWQa-1

## Ques 2: What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
Answer: The most useful features that i added in the project is the responsiveness and the different states for different panels like for editing it will be in state : 1, for viewing state: 2 and deletion state: 3. Additionally few hover effects have been used for differentiating between buttons and plain text.

### const [stateo, setstateo] = useState(0);
### <div className='App-hidden' style={{left: stateo===0?"100%":""}}>
### <div className='Edit' style={{left: stateo===1?"":"100%"}}>
### etc for the state

### <button className='Save' onClick={()=>{
### if(ele.replace.id === -1) setlist([...list, ele.add]);
### else{
###     list[ele.replace.id] = ele.add;
###     setlist(list);
### }
### setvirlist(list)
### setele({add: {title: "", desc: "", dat: "", priority: 0}, view: {title: "", desc: "", dat: "", priority: 0}, replace: {id: -1}})
### setstateo(0)
### }}>Save</button>

## Ques 3: How would you track down a performance issue in production? Have you ever had to do this?
Answer. Actually yes i have track down a performance issue while searching operation. Another usestate variable has been used with it namely, virlist - virtual list, which is helping while sorting out the searched results. Its helping to keep the data intact while searching is going on.

## Ques 4: If you had more time, what additional features or improvements would you consider adding to the task management application?
Answer. First and foremostly login credentials, for personalized applications. Then making searching algorithm in different aspects, not only through names but priority wise, date wise, even alphabetical order of the title, etc. 