// создание 2 модалок this.createModal  this.ewDITmODAL В КЛАССАХ


class createNewProject {
    constructor() {
        let mod = new modal(this.save);        

        //this.chooseActionForm = this.chooseActionForm.bind(this);
        // this.changeImageProject = this.changeImageProject.bind(this);
        // this.saveInfoProject = this.saveInfoProject.bind(this);
        // this.closePopup = this.closePopup.bind(this);
        // this.renderProjectPage = this.renderProjectPage.bind(this);
        // this.showPage = this.showPage.bind(this);
    }
    

    init (){
        let formCreateProject = document.querySelector('.wr-create-project');
        let form = formCreateProject.querySelector('form');
       
        form.addEventListener('change', this.changeImageProject);
        form.addEventListener('click', this.chooseActionForm);
    }
    
    showForm() {
        let formCreateProject = document.querySelector('.wr-create-project');
        let form = formCreateProject.querySelector('form');
        let errorMessageSameNameProject = form.querySelector('.error-message.same-name-project');
        let inputNameProject =  form.querySelector('.project-name input');        
       
        errorMessageSameNameProject.classList.remove('show');
        inputNameProject.value = '';
        formCreateProject.classList.add('show');
    }

    renderProjectPage() {
        let projectPage = document.querySelector('.wr-project');
        let projectTitle = projectPage.querySelector('h1');
        let formCreateProject = document.querySelector('.wr-create-project');
        let hashName = JSON.parse(localStorage.getItem(this.key)).projectUrl;

        formCreateProject.classList.remove('show');

        location.hash = hashName;

        projectTitle.innerHTML = this.projectInfoObj.projectName;
        if (this.projectInfoObj.projectImage) {
            projectPage.style.backgroundImage = "url(" + this.projectInfoObj.projectImage + ")";
        };
    };

    showPage() {
        let projectPage = document.querySelector('.wr-project');
        let projectTitle = projectPage.querySelector('h1');
        let URLHash = window.location.hash;
        let stateJSON = decodeURIComponent(URLHash.substr(1));

        if ( stateJSON != "" ) {
            if (localStorage.getItem(stateJSON) !== null) {
                let projectInfoObj = JSON.parse(localStorage.getItem(stateJSON));
                
                projectTitle.innerHTML = projectInfoObj.projectName;
                if (projectInfoObj.projectImage) {
                    projectPage.style.backgroundImage = "url(" + projectInfoObj.projectImage + ")";
                } else {
                    projectPage.style.backgroundImage = "none";
                    projectPage.style.backgroundColor = "#fff";
                }; 

            } else {
                alert('Page not found');
                window.location.hash = '';
            };
        }        
    };
};

// class listProjects {
//     constructor() {
//         this.fileImageProject = null;
//         this.chooseActionForm = this.chooseActionForm.bind(this);
//         this.changeImageProject = this.changeImageProject.bind(this);
//         this.saveInfoProject = this.saveInfoProject.bind(this);
//     }

//     showList() {
//         let wrapperListProject = document.querySelector('.wr-projects-list');
//         let showListProject = document.querySelector('.wr-projects-list .container');

//         wrapperListProject.classList.add('show');
//         showListProject.classList.add('show-list');

//         this.getList();
//         this.listActions();
//         this.removeProject();
//     }

//     getList() {     
//        let currentLinks = document.querySelectorAll('.wr-projects-list ul li a');
//        let currentHrefs = [];
//        for (let i = 0; i < currentLinks.length; i++) {
//            let href = currentLinks[i].getAttribute('href').substr(1);
//            currentHrefs.push(href);
//        }

//        let arr = [];
//         for (let key in localStorage) {
//             if (localStorage.length > arr.length) {
//                 arr.push(key);
//             }
//         }

//         let diffResult = this.updateListProject(currentHrefs, arr);

//         if (diffResult) {
//             this.renderList(diffResult);
//         }
//     };

//     renderList(arr) {
//         let list = document.querySelector('.wr-projects-list ul');
//         for (let i = 0; i < arr.length; i++) {
//             let newLi = document.createElement('li');
//             let newLink =  document.createElement('a');
//             let btnRemoveProject = document.createElement('button');
//             let btnEditProject = document.createElement('button');
//             let btnContainer = document.createElement('div');

//             newLink.innerHTML = `${arr[i]}`;
//             newLink.href = `#${arr[i]}`;
//             newLink.className = 'link-project';
//             newLi.appendChild(newLink);

//             btnRemoveProject.className = 'btn-remove-project';
//             btnRemoveProject.innerHTML = 'remove';

//             btnEditProject.className = 'btn-edit-project';
//             btnEditProject.innerHTML = 'edit';

//             btnContainer.appendChild(btnEditProject);
//             btnContainer.appendChild(btnRemoveProject);           

//             newLi.appendChild(btnContainer);
//             list.appendChild(newLi);
//         }
//     };

//     updateListProject(a1, a2) {
//         return a1.filter(i=>!a2.includes(i))
//         .concat(a2.filter(i=>!a1.includes(i)))
//     };

//     listActions() {
//         let list = document.querySelector('.wr-projects-list .container');

//         list.addEventListener('click', (e) => {
//             if (e.target.className === "link-project") {
//                 this.openProject();
//             };
//             if (e.target.className === "btn-edit-project") {
//                 this.editProject(e);
//             };
//             if (e.target.className === "btn-remove-project") {
//                 this.removeProject();
//             };
//             if (e.target.className === "btn-hide-list") {
//                 this.hideListToBtn();
//             };
//         });
//     };

//     hideListToBtn() {
//         let wrapperListProject = document.querySelector('.wr-projects-list');
//         let showListProject = document.querySelector('.wr-projects-list .container');

//         wrapperListProject.classList.remove('show');
//         showListProject.classList.remove('show-list');
//     };

//     openProject() {
//         let wrapperListProject = document.querySelector('.wr-projects-list');
//         let showListProject = document.querySelector('.wr-projects-list .container');

//         wrapperListProject.classList.remove('show');
//         showListProject.classList.remove('show-list');
//     };

//     editProject(e) {
//         //  let parent = e.target.parentNode.parentNode;
//         // let key = parent.querySelector('a').getAttribute('href').substr(1);

//         let formCreateProject = document.querySelector('.wr-edit-project');
//         let form = formCreateProject.querySelector('form');
//         let errorMessageSameNameProject = form.querySelector('.error-message.same-name-project');
//         let inputNameProject =  form.querySelector('.project-name input');        
       
//         errorMessageSameNameProject.classList.remove('show');
//         inputNameProject.value = '';
//         formCreateProject.classList.add('show');
//         form.addEventListener('change', this.changeImageProject);
//         form.addEventListener('click', this.chooseActionForm);
//     };

//     chooseActionForm(e) {
//         if (e.target.id === "edit-project") {
//             let objProject = this.saveInfoProject();
//             return objProject;
//         }
//         if (e.target.id === "close-edit-popup") {
//             this.closePopup();
//         }
//     };

//     changeImageProject(e) {
//         if (e.target.className === "input-file") {
//             let returnFileName = document.querySelector('.wr-edit-project .file-return');
        
//             let reader = new FileReader();
//             reader.onloadend = () => (this.fileImageProject = reader.result);
//             reader.readAsDataURL(e.target.files[0]);
            
//             returnFileName.innerHTML = e.target.value.replace('C:\\fakepath\\', '');
//         }    
//     };

//     saveInfoProject() {
//         let errorMessageEmptyValue = document.querySelector('.wr-edit-project .error-message.empty-value');
//         let errorMessageSameNameProject = document.querySelector('.wr-edit-project .error-message.same-name-project');
//         let inputNameProject =  document.querySelector('.wr-edit-project .project-name input');
//         let nameProject = inputNameProject.value;
//         let nameImage = document.querySelector('.wr-edit-project .file-return');

//         if (nameProject) {            
//             this.key = nameProject.replace(/ /g, '-');           
//             if (localStorage.getItem(this.key) !== null) {
//                 errorMessageEmptyValue.classList.remove('show');
//                 errorMessageSameNameProject.classList.add('show');
//             } else {
//                 this.projectInfoObj = {
//                     projectName: nameProject,
//                     projectImage: this.fileImageProject,
//                     projectUrl:  this.key,
//                 };                    
//                 nameProject = '';
//                 nameImage.innerHTML = '';
//                 return this.projectInfoObj;
//             }
//         } else {
//             errorMessageSameNameProject.classList.remove('show');
//             errorMessageEmptyValue.classList.add('show');
//         }
//     };

//     closePopup() {
//         let formCreateProject = document.querySelector('.wr-edit-project');
//         let errorMessage = document.querySelector('.error-message');
//         let nameProject =  document.querySelector('.project-name input');

//         nameProject.value = '';
//         errorMessage.classList.remove('show');
//         formCreateProject.classList.remove('show');
//     };

//     removeProject() {};
// };

let createProject = new createNewProject();
//let createListProjects = new listProjects();


createProject.init();
createProject.showPage();
window.onhashchange = createProject.showPage;

showCreateProjectPopup.addEventListener('click', function() {
	createProject.showForm();
});
// showListProjects.addEventListener('click', function() {
// 	createListProjects.showList();
// });