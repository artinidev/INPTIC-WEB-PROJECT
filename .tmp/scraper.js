const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    console.log('Navigating to https://nexo.com...');
    await page.goto('https://nexo.com', { waitUntil: 'networkidle2', timeout: 60000 });

    console.log('Extracting styles...');
    const designSystem = await page.evaluate(() => {
      
      const getStyles = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const styles = window.getComputedStyle(el);
        return {
          fontFamily: styles.fontFamily,
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight,
          lineHeight: styles.lineHeight,
          color: styles.color,
          backgroundColor: styles.backgroundColor,
          borderRadius: styles.borderRadius,
          padding: styles.padding,
          boxShadow: styles.boxShadow,
        };
      };

      const getMultipleStyles = (selector, limit = 3) => {
        const els = Array.from(document.querySelectorAll(selector)).slice(0, limit);
        return els.map(el => {
          const styles = window.getComputedStyle(el);
          return {
            tag: el.tagName,
            classes: el.className,
            fontFamily: styles.fontFamily,
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight,
            lineHeight: styles.lineHeight,
            color: styles.color,
            backgroundColor: styles.backgroundColor,
            borderRadius: styles.borderRadius,
            padding: styles.padding,
            boxShadow: styles.boxShadow,
            backdropFilter: styles.backdropFilter || styles.webkitBackdropFilter,
            transition: styles.transition,
            margin: styles.margin,
            display: styles.display,
            gap: styles.gap
          };
        });
      };

      const rootStyles = window.getComputedStyle(document.documentElement);
      const cssVars = {};
      for (let i = 0; i < rootStyles.length; i++) {
        const prop = rootStyles[i];
        if (prop.startsWith('--')) {
          cssVars[prop] = rootStyles.getPropertyValue(prop).trim();
        }
      }

      return {
        colors: {
          backgrounds: getMultipleStyles('body, section, header, footer').map(s => s.backgroundColor).filter(c => c && c !== 'rgba(0, 0, 0, 0)'),
          text: getMultipleStyles('h1, h2, p, a, span').map(s => s.color).filter(c => c),
        },
        typography: {
          h1: getStyles('h1'),
          h2: getStyles('h2'),
          h3: getStyles('h3'),
          p: getStyles('p'),
          body: getStyles('body'),
        },
        buttons: getMultipleStyles('button, a.btn, a[class*="button"], a[class*="btn"]', 5),
        cards: getMultipleStyles('[class*="card"], [class*="box"], section > div > div', 5),
        containers: getMultipleStyles('.container, [class*="container"], section > div', 5),
        variables: Object.keys(cssVars).length > 0 ? Object.fromEntries(Object.entries(cssVars).slice(0, 50)) : 'No CSS Variables found or too many'
      };
    });

    console.log('Saving to data.json...');
    fs.writeFileSync('.tmp/nexo_design_system.json', JSON.stringify(designSystem, null, 2));
    
    console.log('Done!');
    await browser.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();
