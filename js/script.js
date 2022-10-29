const overview=document.querySelector(".overview");
const username="wmcqueen9";
const repoList=document.querySelector(".repo-list");



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

const getRepo=async function(){
  const fetchRepo=await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData=await fetchRepo.json();
  displayRepo(repoData);
  //console.log(repoData);
};

const displayRepo=function(repos){
  for( const repo of repos){
    const ul=document.createElement("ul");
    ul.innerHTML=`<h3>${repo.name}</h3>`;
    repoList.append(ul);
  };
};
