# Who's in space?

Track the ISS and current astronauts.

## Running

Clone the project and enter repo:

```
git clone git@github.com:octopusinvitro/whosinspace.git .
cd whosinspace
```

Install dependencies and run gulp:

```
npm install
gulp
```

Go to <http://localhost:4000/gh-pages> to see the site.

Gulp will translate, concatenate and uglify all JavaScript files, listening to changes in the files every time you save and rebuilding the site inside of the `gh-pages` folder. It will also reload the site in the browser.


## Running the tests:

Go to <http://localhost:4000/test> to see the tests.


## Contributions

This repo requires a bit of initial setup, as the source code lives in the `master` branch, but the built site lives in the `gh-pages` branch (you just need to set it up once forever).

To achieve this:


**If you have already run gulp**

Enter the `gh-pages` directory and remove everything (don't worry its contents are recreated automatically):

```
cd gh-pages
rm -rf .
```

Continue with Next Steps

**If you haven't run gulp yet**

Create a new directory called `gh-pages` and enter it:

```
mkdir gh-pages
cd gh-pages
```

Continue with Next Steps

**Next steps**

* Clone the repository again in that folder and checkout the `gh-pages` branch:

```
git clone git@github.com:octopusinvitro/whosinspace.git .
git checkout gh-pages
```

* Make sure you are in the `gh-pages` branch, and stay in that branch forever in this folder:

```
git branch
* gh-pages
  master
```

* Pull the last changes:

```
git pull origin gh-pages
```

That's it, you are all set up. From now on, every time you build the site, it will be built inside of this folder, so you just have to remember to enter the folder, commit, and push to the `gh-pages` branch.
