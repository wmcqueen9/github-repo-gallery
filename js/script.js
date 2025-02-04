const overview=document.querySelector(".overview");
const username="wmcqueen9";
const repoList=document.querySelector(".repo-list");
const allRepos=document.querySelector(".repos");
const repoData=document.querySelector(".repo-data");
const repoButton=document.querySelector(".view-repos");
const filterInput=document.querySelector(".filter-repos");



const getUser=async function(){
    const user=await fetch(`https://api.github.com/users/${username}`);
const userData=await user.json();
console.log(userData);
displayInfo(userData);

};
getUser();
const displayInfo=function(data){
const div=document.createElement("div");
div.classList.add("user-info");
div.innerHTML= `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.login}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> `;
    overview.append(div);
    getRepo();
};
//fetches the number of repos made 
const getRepo=async function(){
  const fetchRepo=await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData=await fetchRepo.json();
  displayRepo(repoData);
  //console.log(repoData);
};
//shows a list of the repos
const displayRepo=function(repos){
  filterInput.classList.remove("hide");
  for( const repo of repos){
    const li=document.createElement("li");
    li.classList.add("repo");
    li.innerHTML=`<h3>${repo.name}</h3>`;
    repoList.append(li);
  
  };
};
//added an listener when a repo is selected
repoList.addEventListener("click",function(e){
if(e.target.matches("h3")){
  const repoName=e.target.innerText;
  specificRepo(repoName);
}
});
//fetches all the repos made so far
const specificRepo=async function(repoName){
const fetchSpecific  = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
const repoInfo= await fetchSpecific.json();
console.log(repoInfo);

//fetches the languges used to create the repo
const fetchLanguages= await fetch(repoInfo.languages_url);
const languageData=await fetchLanguages.json();
console.log(languageData);
const languages=[];

for (let language in languageData){
  languages.push(language);
  console.log(language);
}
repoSpecificInfo(repoInfo,languages);
};

//shows the specific repo selected data
const repoSpecificInfo=function(repoInfo, languages){
repoData.innerHTML="";
repoData.classList.remove("hide");
allRepos.classList.add("hide");
const div= document.createElement("div");
div.innerHTML=`
<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append (div);
    repoButton.classList.remove("hide");

};
repoButton.addEventListener("click",function(){
  allRepos.classList.remove("hide");
  repoButton.classList.add("hide");
  repoData.classList.add("hide");
});


filterInput.addEventListener("input", function(e){
const searchRepo=e.target.value;
//console.log(searchRepo);
const repos=document.querySelectorAll(".repo");
const lowerCase=searchRepo.toLowerCase();

for(const repo of repos){
  const lowerText=repo.innerText.toLowerCase();
  if(lowerText.includes(lowerCase)){
    repo.classList.remove("hide");
  }else{
    repo.classList.add("hide");
  }
  
}
});
