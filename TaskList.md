# Task List

- Clean up website design
  - limit width (e.g. middle 70%) - **k**
  - make stats table mobile-friendly - **k**
  - clear amount field after additing/deleting - **N**
  - ensure fields are same width - **K**
  - make logo fly out on charter - **K**
  
# Landing page:
1) The page: cointork.com/welcome loads a long time when it has never opened before - users might think it's not working and leave. Is there anything that can be done about it? - loader animation  - **K**
3) The logo letter colours should be changed to a slightly darker grey (maybe… not sure - what are your thoughts? maybe  we should ask someone else). There shouldn't be any space between COIN and TORK. Also, I think letter T should be in a different colour. - **K** - **Nik, select color and let me know**
4) The background picture should change to something different - I am not feeling this Toronto skyline but I am not sure what to change it to - we should brainstorm and try out a few idea.- **K** - **Nik, select picture and let me know**
5) The texts throughout landing page will change but we can take care of that later. - **Nik come up with texts**
6) The foreground colour that is over the picture of Toronto skyline is too sad and gloomy, we should choose some other colour theme, maybe ask someone artsy, or try to figure it out ourselves. - **Nik, provide color for freground**
7) The symbol before Try It Out should be removed. -  - **K**
8) Magnifying Glass icon from the navigation menu at the top should be removed.  - **K**
9) Social media icons on landing page (Twitter, Facebook, LinkedIn should be removed)  - **K**
10) The navigation menu at the top should have more menu items for missing sections. - **K**
11) In the nagivation menu at the top, there is no need to underscore Home  - **K**
12) Add Team section to landing page.  - **K**
13) Remove the logo at the bottom of the page on the left. - **K**
14) To my previous points about colours - since our Submit Button is in nice Purple colour - maybe we can have the rest of the page in a similar coloud theme. **Nik, when provide info for items 3,4,5, we will see**
15) In the browser tab - CT favicon or whatever its called shouldn't be black. I am in incognito and can barely see anything because of that. - **K**
16) CoinTork | Welcome to CoinTork should also change for SEO, as well as other texts on the page. - **TBD**
17) priority 2 - try freeze top nav bar  - **K**
  
# Cointork.com (not logged in):
1) The buttons and fields are too far apart. They should start where that donation text start underneath. **K**
2) Donations at the bottom will be replaced by a button. More on that later. Welcome button will should be recoloured in purple same as Submit on landing page.  **N**
3) Remove grey subtext IDs in drop-down menus in all drop downs. - **K**
4) The fields like Bitcoin and Token amount should be shrunk, they are too wide. **K**
5) Arrows up and down should be removed from the Token amount field. **N**
6) After the coins are added, and the charts are drawn, table contents, total KPI display may need to be changed to properly fit things and show the most important stuff but we can take care of this later. **TBD**
Some other notes from iNotes:
7) Make KPI tile headings bold **N**
8) Limit number of KPI table items to 4 - **N**
  
# Cointork.com (logged in):
1) When I go to log in - we should combine this page with the Login page from the landing page (we shouldn't have 2 login versions). **K**
3) The Profile button generates the dropdown somewhere further down the page when on mobile device. **K**
4) I cannot switch colour theme when on a mobile device. **TBD**
5) The time sliders still don't fit on the page properly (maybe we should use the sliders that allow the user to type in the date into each of the ends). Add buttons "YTD", "Month-to-date", "last week", "last month", etc - **N**
6) Detailed table contents to be discussed.  - **TBD**


# Mobile chart potential fixes:
1) Show tooltips as the mouse hovers along X axis - https://jsfiddle.net/a077grhm/ **N**
2) The fact that we cannot get the tooltips to show properly when we click on bar and pie charts is due to change in Aspect Ratio from what I can tell. Do you have ideas on how to fix it? - **first try to remove  fixed height in gentella .min.css**
  
  
# Enhancements:
 - Make hyperlinks in stats table to select token name
 - write updating script to update db every 5 minutes 
 - add new item to return output in history API that returns max/min from the database based on token name
 - change volume chart to dollav value change chart
 - add drop down to line chart that only controls line chart
  
# On Hold
- Connect CoinAPI
- Connect TradingView
- possibly embed another token selector inside the Live Chart widget 
- create currency icons
- remove little up/down arrows
- Narrow screen - chart.js tooltips are off

# Landing
 - change text in "features" section: **Nik, provide text!**
 
# Done
- Decide what to do with KPI table sub-headings - remove
- slider does not work on mobile
- Speed up landing page load
- Fix out chart squishing
- Functionality to autosave crypto assets
- remove Gentalla footer
- choose chart border colour
- get chart to actually draw on first add rather than appear instantly
- come up with domain name
- if Line Chart already loaded, and there was no change in currency, don't make another call
- add labels for Line Price chart
- update legend for the Line Price chart
- Load all currencies into DB
- make the location of slider below the Line Chart
- Landing: change color
