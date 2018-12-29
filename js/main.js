let showCreateProjectPopup = document.getElementById('create-new-project');
let showListProjects = document.getElementById('show-projects');

class RenderPage {
    constructor() {
        this.showPage = this.showPage.bind(this);
        this.renderMainPage = this.renderMainPage.bind(this);
    };

    renderMainPage() {
        let projectPage = document.querySelector('.wr-project');
        if (projectPage.hasChildNodes()) {
            projectPage.removeChild(projectPage.firstChild)
        }

        let h1 = document.createElement('h1');
        h1.innerHTML = "Welcome to Trololo!!!";

        let siteDescription = document.createElement('p');;
        let siteSubDescription = document.createElement('p');;

        siteDescription.className = "site-description";
        siteDescription.innerHTML = "Trololo is a free, flexible and intuitive way to organize anything with anyone.";

        siteSubDescription.className = "site-sub-description";
        siteSubDescription.innerHTML = "You can use long chains of emails, not stickers and stickers, and project management software. Trello helps to see all the details of the project at a glance.";
        
        let contentContainer = document.createElement('div');
        contentContainer.className = "container";        
        projectPage.appendChild(contentContainer);

        contentContainer.appendChild(h1);
        contentContainer.appendChild(siteDescription);
        contentContainer.appendChild(siteSubDescription);
    };

    showPage() {
        let projectPage = document.querySelector('.wr-project');
        let URLHash = window.location.hash;
        let stateJSON = decodeURIComponent(URLHash.substr(1));

        if ( stateJSON != "" ) {
            if (localStorage.getItem(stateJSON) !== null) {
                let projectTitle = document.createElement('h1');
                let projectInfoObj = JSON.parse(localStorage.getItem(stateJSON));
                
                if (projectPage.hasChildNodes()) {
                    projectPage.removeChild(projectPage.firstChild)
                }

                let contentContainer = document.createElement('div');
                contentContainer.className = "container";
                projectPage.appendChild(contentContainer);

                projectTitle.innerHTML = projectInfoObj.projectName;
                contentContainer.appendChild(projectTitle);

                if (projectInfoObj.projectImage) {
                    projectPage.style.backgroundImage = "url(" + projectInfoObj.projectImage + ")";
                } else {
                    projectPage.style.backgroundImage = "none";
                    projectPage.style.backgroundColor = "#fff";
                };

            } else {
                window.location.hash = '';
                let contentContainer = projectPage.querySelector('.container');
                contentContainer.remove();
                projectPage.style.backgroundImage = "none";
                projectPage.style.backgroundColor = "#fff";
            };
        } else {
            this.renderMainPage();
        }
    };
};

class Modal {
    constructor() {
        this.urlBgImageProject = null;      

        this.changeImageProject = this.changeImageProject.bind(this);
        this.closePopup = this.closePopup.bind(this);
    };

    showForm() {
        let formCreateProject = document.querySelector('.wr-create-project');
        let form = formCreateProject.querySelector('form');
        let errorMessageSameNameProject = form.querySelector('.error-message.same-name-project');
        let inputNameProject =  form.querySelector('.project-name input');        
       
        errorMessageSameNameProject.classList.remove('show');
        inputNameProject.value = '';
        formCreateProject.classList.add('show');
    };

    changeImageProject(e) {
        if (e.target.className === "input-file") {
            let returnFileName = document.querySelector('.wr-create-project .file-return');
            let fileImageObject = e.target.files[0];
            let reader = new FileReader();
            
            reader.onloadend = () => (this.urlBgImageProject = reader.result);
            reader.readAsDataURL(fileImageObject);
            returnFileName.innerHTML = e.target.value.replace( 'C:\\fakepath\\', '' );
        }
    };

    closePopup() {
        let formCreateProject = document.querySelector('.wr-create-project');
        let errorMessage = formCreateProject.querySelector('.error-message');
        let nameProject =  formCreateProject.querySelector('.project-name input');

        nameProject.value = '';
        errorMessage.classList.remove('show');
        formCreateProject.classList.remove('show');
    };
};

class SaveInfoModal {
    constructor() {
        this.saveInfoProject = this.saveInfoProject.bind(this)
    };

    saveInfoProject(urlBgImageProject, getProjectInfo) {
        let errorMessageEmptyValue = document.querySelector('.wr-create-project .error-message.empty-value');
        let errorMessageSameNameProject = document.querySelector('.wr-create-project .error-message.same-name-project');
        let inputNameProject =  document.querySelector('.wr-create-project .project-name input');
        let nameProject = inputNameProject.value;
        let nameImage = document.querySelector('.wr-create-project .file-return');

        if (nameProject) {            
            let key = nameProject.replace(/ /g, '-');           
            if (localStorage.getItem(key) !== null) {
                errorMessageEmptyValue.classList.remove('show');
                errorMessageSameNameProject.classList.add('show');
            } else {
                let projectInfoObj = {
                    projectName: nameProject,
                    projectImage: urlBgImageProject,
                    projectUrl: key,
                };                    
                
                nameProject = '';
                nameImage.innerHTML = '';

                localStorage.setItem(key, JSON.stringify(projectInfoObj));

                getProjectInfo(projectInfoObj);
            }
        } else {
            errorMessageSameNameProject.classList.remove('show');
            errorMessageEmptyValue.classList.add('show');
        }
    };
};

class CreateNewProject {
    constructor() {
        this.key = null;
        this.projectInfoObj = null;

        this.chooseActionForm = this.chooseActionForm.bind(this);
        this.renderProjectPage = this.renderProjectPage.bind(this);
        this.createProjectModal = new Modal();
        this.saveInfoProject = new SaveInfoModal();
    };

    init (){
        let formCreateProject = document.querySelector('.wr-create-project');
        let form = formCreateProject.querySelector('form');
       
        form.addEventListener('change', this.createProjectModal.changeImageProject);
        form.addEventListener('click', this.chooseActionForm);
    };

    chooseActionForm(e) {
        if (e.target.id === "create-project") {
            this.saveInfoProject.saveInfoProject(this.createProjectModal.urlBgImageProject, this.renderProjectPage);
        }
        if (e.target.id === "close-popup") {
            this.createProjectModal.closePopup();
        }
    };

    renderProjectPage(infoProject) {        
        this.projectInfoObj = infoProject;
        this.key = this.projectInfoObj.projectUrl;
        let projectPage = document.querySelector('.wr-project');
        let projectTitle = projectPage.querySelector('h1');
        let formCreateProject = document.querySelector('.wr-create-project');
        let hashName = JSON.parse(localStorage.getItem(this.key)).projectUrl;
        let urlBgImageProject = this.projectInfoObj.projectImage;

        formCreateProject.classList.remove('show');

        location.hash = hashName;

        projectTitle.innerHTML = this.projectInfoObj.projectName;
              
        if(urlBgImageProject) {
           requestAnimationFrame(function(){
            projectPage.style.backgroundImage = "url(" + urlBgImageProject + ")";
           });
        }
    };
};

class ListProjects {
    constructor() {
        this.chooseActionForm = this.chooseActionForm.bind(this);
        this.listActions = this.listActions.bind(this);

        this.editProjectModal = new Modal();
        this.saveInfoProject = new SaveInfoModal();
    }

    showList() {
        let wrapperListProject = document.querySelector('.wr-projects-list');
        let showListProject = document.querySelector('.wr-projects-list .container');

        wrapperListProject.classList.add('show');
        showListProject.classList.add('show-list');

        this.getList();
    }

    getList() {     
       let currentLinks = document.querySelectorAll('.wr-projects-list ul li a');
       let currentHrefs = [];
       for (let i = 0; i < currentLinks.length; i++) {
           let href = currentLinks[i].getAttribute('href').substr(1);
           currentHrefs.push(href);
       }

       let arr = [];
        for (let key in localStorage) {
            if (localStorage.length > arr.length) {
                arr.push(key);
            }
        }

        let diffResult = this.updateListProject(currentHrefs, arr);

        if (diffResult) {
            this.renderList(diffResult);
        }
    };

    renderList(arr) {
        let list = document.querySelector('.wr-projects-list ul');
        for (let i = 0; i < arr.length; i++) {
            let newLi = document.createElement('li');
            let newLink =  document.createElement('a');
            let btnRemoveProject = document.createElement('button');
            let btnEditProject = document.createElement('button');
            let btnContainer = document.createElement('div');

            newLink.innerHTML = `${arr[i]}`;
            newLink.href = `#${arr[i]}`;
            newLink.className = 'link-project';
            newLi.appendChild(newLink);

            btnRemoveProject.className = 'btn-remove-project';
            btnRemoveProject.innerHTML = 'remove';

            btnEditProject.className = 'btn-edit-project';
            btnEditProject.innerHTML = 'edit';

            btnContainer.appendChild(btnEditProject);
            btnContainer.appendChild(btnRemoveProject);           

            newLi.appendChild(btnContainer);
            list.appendChild(newLi);
        }
    };

    updateListProject(a1, a2) {
        return a1.filter(i=>!a2.includes(i))
        .concat(a2.filter(i=>!a1.includes(i)))
    };

    listActions() {
        let list = document.querySelector('.wr-projects-list .container');

        list.addEventListener('click', (e) => {
            if (e.target.className === "link-project") {
                this.openProject();
            };
            if (e.target.className === "btn-edit-project") {
                this.editProjectModal.showForm();
            };
            if (e.target.className === "btn-remove-project") {
                this.removeProject();
            };
            if (e.target.className === "btn-hide-list") {
                this.hideListToBtn();
            };
        });
    };

    hideListToBtn() {
        let wrapperListProject = document.querySelector('.wr-projects-list');
        let showListProject = document.querySelector('.wr-projects-list .container');

        wrapperListProject.classList.remove('show');
        showListProject.classList.remove('show-list');
    };

    openProject() {
        let wrapperListProject = document.querySelector('.wr-projects-list');
        let showListProject = document.querySelector('.wr-projects-list .container');

        wrapperListProject.classList.remove('show');
        showListProject.classList.remove('show-list');
    };

    chooseActionForm(e) {
        if (e.target.id === "edit-project") {
            this.saveInfoProject.saveInfoProject(this.editProjectModal.urlBgImageProject);
        }
        if (e.target.id === "close-edit-popup") {
            this.closePopup();
        }
    };

    removeProject() {};
};

let createProject = new CreateNewProject();
let createListProjects = new ListProjects();
let renderPage = new RenderPage();

createProject.init();

createListProjects.listActions();

renderPage.showPage();
window.onhashchange = renderPage.showPage;

showCreateProjectPopup.addEventListener('click', function() {
	createProject.createProjectModal.showForm();
});
showListProjects.addEventListener('click', function() {
	createListProjects.showList();
});
