let showCreateProjectPopup = document.getElementById('create-new-project');
let showListProjects = document.getElementById('show-projects');

class createNewProject {
    constructor() {
        this.fileImageProject = null;
        this.projectInfoObj = null;
        this.key = null;

        this.chooseActionForm = this.chooseActionForm.bind(this);
        this.changeImageProject = this.changeImageProject.bind(this);
        this.saveInfoProject = this.saveInfoProject.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.renderProjectPage = this.renderProjectPage.bind(this);
        this.showPage = this.showPage.bind(this);
    }

    showForm() {
        let formCreateProject = document.querySelector( '.wr-create-project' );
        let form = formCreateProject.querySelector('form');
        let errorMessageSameNameProject = document.querySelector('.error-message.same-name-project');
        let inputNameProject =  document.querySelector( '.project-name input' );        
       
        errorMessageSameNameProject.classList.remove('show');
        inputNameProject.value = '';
        formCreateProject.classList.add('show');
        form.addEventListener('click', this.chooseActionForm);
        form.addEventListener('change', this.changeImageProject);
    }

    chooseActionForm(e) {
        if (e.target.id === "create-project") {
            this.saveInfoProject();
        }
        if (e.target.id === "close-popup") {
            this.closePopup();
        }
    };

    changeImageProject(e) {
        
       // let formCreateProject = document.querySelector( '.input-file' );
        // let label = document.querySelector( '.input-file-trigger' );
        let returnFileName = document.querySelector('.file-return');

        this.fileImageProject = e.target.files[0];
        returnFileName.innerHTML = e.target.value.replace( 'C:\\fakepath\\', '' );
            
        // label.addEventListener( 'keydown', (event) => {  
        //     if ( event.keyCode == 13 || event.keyCode == 32 ) {  
        //         formCreateProject.focus();  
        //     }  
        // });
        // formCreateProject.addEventListener( 'change', (e) => {
        //     this.fileImageProject = e.target.files[0];
        //     returnFileName.innerHTML = e.target.value.replace( 'C:\\fakepath\\', '' );
        // });        
    }

    saveInfoProject() {
        let errorMessageEmptyValue = document.querySelector('.error-message.empty-value');
        let errorMessageSameNameProject = document.querySelector('.error-message.same-name-project');
        let inputNameProject =  document.querySelector( '.project-name input' );
        let nameProject = inputNameProject.value;

        if (nameProject) {            
            this.key = nameProject.replace(/ /g, '-');           
            if (localStorage.getItem(this.key) !== null) {
                errorMessageEmptyValue.classList.remove('show');
                errorMessageSameNameProject.classList.add('show');
            } else {
                this.projectInfoObj = {
                    projectName: nameProject,
                    projectImage: this.fileImageProject,
                    projectUrl:  this.key,
                };                    
                localStorage.setItem(this.key, JSON.stringify(this.projectInfoObj));
                nameProject = '';
                this.renderProjectPage();
            }
        } else {
            errorMessageSameNameProject.classList.remove('show');
            errorMessageEmptyValue.classList.add('show');
        }
    };

    closePopup() {
        let formCreateProject = document.querySelector( '.wr-create-project' );
        let errorMessage = document.querySelector('.error-message');
        let nameProject =  document.querySelector( '.project-name input' );

        nameProject.value = '';
        errorMessage.classList.remove('show');
        formCreateProject.classList.remove('show');
    };

    renderProjectPage() {
        let projectPage = document.querySelector('.wr-project');
        let projectTitle = projectPage.querySelector('h1');
        let formCreateProject = document.querySelector( '.wr-create-project' );
        let hashName = JSON.parse(localStorage.getItem(this.key)).projectUrl;

        formCreateProject.classList.remove('show');

        location.hash = hashName;

        projectTitle.innerHTML = this.projectInfoObj.projectName;
        let reader = new FileReader();
        reader.onloadend = function(){
            projectPage.style.backgroundImage = "url(" + reader.result + ")";        
        }
        if(this.fileImageProject) {
            reader.readAsDataURL(this.fileImageProject);
        }    
    };

    showPage() {
        let projectPage = document.querySelector('.wr-project');
        let projectTitle = projectPage.querySelector('h1');
        let URLHash = window.location.hash;
        let stateJSON = decodeURIComponent(URLHash.substr(1));
        // let SPAState;

        // if ( stateJSON != "" )
        //     SPAState = JSON.parse(stateJSON);
        // else
        //     SPAState = "";

        

        let projectInfoObj = JSON.parse(localStorage.getItem(stateJSON))

        projectTitle.innerHTML = projectInfoObj.projectName;
        let reader = new FileReader();
        reader.onloadend = function(){
            projectPage.style.backgroundImage = "url(" + reader.result + ")";        
        }
        if(this.fileImageProject) {
            reader.readAsDataURL(this.fileImageProject);
        }    
    };
};

class listProjects {
    constructor() {}

    showList() {
        let popupShow = document.querySelector( '.wr-projects-list' );
        popupShow.style.display = 'block';
        //this.changeImageProject();
        //this.saveInfoProject();
    }
};

let createProject = new createNewProject();
let createListProjects = new listProjects();

// window.onhashchange = createProject.showPage();

showCreateProjectPopup.addEventListener('click', function() {
	createProject.showForm();
});
showListProjects.addEventListener('click', function() {
	createListProjects.showList();
});