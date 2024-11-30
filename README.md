# ablog2githubrelease

## How to use

### Example
```
$ pnpm install
$ pnpm run --silent start --url "<url>" -e 'h2[data-ablog2ghr-innertext*="Fixed"]' -e "#index-1"
```

### Options
#### --url, -u
Set a URL

#### --exclude-selectors, -e
Specify contents you want to exclude with a CSS selector.
This script sets the value of each element's `innerText` as the `data-ablog2ghr-innertext` attribute.
