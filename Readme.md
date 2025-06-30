<!-- upload a file or init command -->
git init
git remote add .
git commit -m "Your message"
git status
git remote add origin<link>
git push <remote name>

<!-- Branch Commands -->
git branch git branch -M main
git checkout <Branch name>
git checkout -b <New branch name>
git branch -d <branch name>

<!-- Undoing changes -->
git reset HEAD~1 or git reset --hard HEAD~1
git push or git push --force

<!-- Runnig the server -->
npm i
setup config file (use.env.example)
npm start