Survey
    .StylesManager
    .applyTheme("modern");

var json = {
 "pages": [
  {
   "name": "page1",
   "elements": [
    {
     "type": "checkbox",
     "name": "question2",
     "title": "Notify me when the following arrives",
     "isRequired": true,
     "choices": [
      {
       "value": "item1",
       "text": "Vegan Dishes"
      },
      {
       "value": "item2",
       "text": "Vegan Groceries"
      },
      {
       "value": "item3",
       "text": "Vegan Fashion & Lifestyle"
      }
     ],
     "hasNone": true,
     "noneText": "Do not send me anything"
    },
    {
     "type": "checkbox",
     "name": "question3",
     "visible": false,
     "visibleIf": "{question2} contains 'item1'",
     "title": "Vegan Dishes",
     "isRequired": true,
     "choices": [
      {
       "value": "item1",
       "text": "Salad"
      },
      {
       "value": "item2",
       "text": "Burger"
      },
      {
       "value": "item3",
       "text": "Plant-Based Meat - beef/pork/chicken/seafood"
      },
      {
       "value": "item4",
       "text": "Noodles"
      },
      {
       "value": "item5",
       "text": "Snack"
      },
      {
       "value": "item6",
       "text": "Dessert"
      },
      {
       "value": "item7",
       "text": "Coffee & Drinks"
      },
      {
       "value": "item8",
       "text": "Dim Sum"
      }
     ]
    },
    {
     "type": "checkbox",
     "name": "question4",
     "visible": false,
     "visibleIf": "{question2} contains 'item2'",
     "title": "Vegan Groceries",
     "isRequired": true,
     "choices": [
      {
       "value": "item1",
       "text": "Vegetables"
      },
      {
       "value": "item2",
       "text": "Plant-Based Meat"
      },
      {
       "value": "item3",
       "text": "Seasonings"
      },
      {
       "value": "item4",
       "text": "Sauce"
      },
      {
       "value": "item5",
       "text": "Plant-Based Egg"
      },
      {
       "value": "item6",
       "text": "Snack"
      },
      {
       "value": "item7",
       "text": "Dessert"
      },
      {
       "value": "item8",
       "text": "Fruits"
      },
      {
       "value": "item9",
       "text": "Plant-Based Dairy"
      },
      {
       "value": "item10",
       "text": "Farmer's Market"
      }
     ]
    },
    {
     "type": "checkbox",
     "name": "question5",
     "visible": false,
     "visibleIf": "{question2} contains 'item3'",
     "title": "Vegan Fashion",
     "isRequired": true,
     "choices": [
      {
       "value": "item1",
       "text": "Bag"
      },
      {
       "value": "item2",
       "text": "Shoes"
      },
      {
       "value": "item3",
       "text": "Body Care"
      },
      {
       "value": "item4",
       "text": "Recycling Services"
      },
      {
       "value": "item5",
       "text": "Zero-Waste Product"
      },
      {
       "value": "item6",
       "text": "Clothes"
      },
      {
       "value": "item7",
       "text": "Hand-Made Jewelries"
      },
      {
       "value": "item8",
       "text": "Recycled Product"
      },
      {
       "value": "item9",
       "text": "Upcycled Product"
      }
     ]
    }
   ],
   "title": "Pay-A-Vegan",
   "description": "You are in control of your AD"
  },
  {
   "name": "page2",
   "elements": [
    {
     "type": "checkbox",
     "name": "question6",
     "title": "Seller Location - select more than 1",
     "isRequired": true,
     "choices": [
      {
       "value": "item1",
       "text": "HK Island"
      },
      {
       "value": "item2",
       "text": "New Territories"
      },
      {
       "value": "item3",
       "text": "Online"
      },
      {
       "value": "item4",
       "text": "Kowloon"
      },
      {
       "value": "item5",
       "text": "Islands"
      }
     ]
    },
    {
     "type": "matrixdropdown",
     "name": "question8",
     "title": "Notify me during - select more than 1",
     "isRequired": true,
     "columns": [
      {
       "name": "Morning"
      },
      {
       "name": "Afternoon"
      },
      {
       "name": "Evening"
      }
     ],
     "choices": [
      {
       "value": "Yes",
       "text": "Yes"
      }
     ],
     "cellType": "checkbox",
     "rows": [
      "Mon-Fri only",
      "Sat-Sun only"
     ]
    }
   ]
  }
 ]
};

window.survey = new Survey.Model(json);

survey
.onComplete
.add(function (sender) {
  $.post(`/survey/consumers`, {results: JSON.stringify(sender.data, null, 3)}, function(data, status) {
    document
    .querySelector('#surveyResult')
    .textContent = "Successfully completed survey";
  })
});

survey.render("surveyElement");
