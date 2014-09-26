/**
 * @param {string} prefix
 * @constructor
 */
function Quizz() {
    this.items = [
        {
            "type": "capital",
            "options": ["Mali", "Ghana", "Ouganda", "Burundi"],
            "question": "Accra",
            "answer": 1
        },
        {
            "type": "capital",
            "options": ["Jordan", "Oman", "Bahrain", "Ethiopia"],
            "question": "Amman",
            "answer": 0
        },
        {
            "type": "capital",
            "options": ["Lithuania", "Slovenia", "Latvia", "Slovakia"],
            "question": "Riga",
            "answer": 2
        },
        {
            "type": "capital",
            "options": ["Philippines", "Indonesia", "Malaysia", "Madagascar"],
            "question": "Manila",
            "answer": 0
        },
        {
            "type": "open",
            "options": ["Quebec", "Toronto", "Ottawa", "Montreal"],
            "question": "Which is capital of Canada?",
            "answer": 2
        },
        {
            "type": "open",
            "options": ["250m.", "300m.", "350m.", "450m."],
            "question": "How tall is the Eiffel Tower (in Meters)?",
            "answer": 1
        },
        {
            "type": "open",
            "options": ["2,986km", "3,054km", "3,474km", "4,132km"],
            "question": "What is the distance to Moon? (in Kilometers)",
            "answer": 2
        },
        {
            "type": "open",
            "options": ["6,778km", "6,958km", "7,223km", "8.334km"],
            "question": "What is the distance to Mars? (in Kilometers)",
            "answer": 0
        },
        {
            "type": "open",
            "options": ["Sushma Swaraj", "Pranab Mukherjee", "Nitin Gadkari", "Ananth Kumar"],
            "question": "Who is today India president?",
            "answer": 1
        },
        {
            "type": "open",
            "options": ["1997", "1988", "1989", "1990"],
            "question": "when did berlin wall fall?",
            "answer": 2
        },
        {
            "type": "open",
            "options": ["North", "South"],
            "question": "Where is Antarctica?",
            "answer": 1
        },
        {
            "type": "open",
            "options": [16, 24, 29, 34],
            "question": "How many countries have French as official language?",
            "answer": 2
        },
        {
            "type": "open",
            "options": [48, 54, 59, 63],
            "question": "How many countries in Africa?",
            "answer": 1
        },
        {
            "type": "open",
            "options": ["6,147,851 km", "7,554,354 km", "8,347,458 km", "9,596,961 km"],
            "question": "Surface of China?",
            "answer": 3
        },
        {
            "type": "open",
            "options": ["Thomas Jefferson", "John Adams", "George Washington", "Justin Bieber"],
            "question": "First president of the USA?",
            "answer": 2
        },
        {
            "type": "open",
            "options": ["North", "South"],
            "question": "Where is Antarctica?",
            "answer": 1
        },
        {
            "type": "open",
            "options": ["Wales", "Scotland", "ireland", "Belgium"],
            "question": "Which country produces Guiness beer?",
            "answer": 2
        },
        {
            "type": "open",
            "options": ["Swiss", "Norway", "Bahamas", "Canada"],
            "question": "How won curling event at 2012 Olympics?",
            "answer": 2
        },
        {
            "type": "open",
            "options": ["Liverpool", "Manchester", "London", "Bristol"],
            "question": "Native city of the Beatles?",
            "answer": 0
        },
        {
            "type": "open",
            "options": ["French", "Italian", "Spanish", "Portuguese"],
            "question": "Nationality of Picasso?",
            "answer": 2
        },
        {
            "type": "open",
            "options": ["12 hours 45 minutes", "13 hours 17 minutes", "15 hours 26 minutes", "16 hours 5 minutes"],
            "question": "Total length of 6 Star Wars episodes?",
            "answer": 1
        },
        {
            "type": "open",
            "options": [14, 16, 18, 22],
            "question": "How many players per australian football team?",
            "answer": 2
        },
        {
            "type": "open",
            "options": [11,12,13,14],
            "question": "How many players per Cricket team?",
            "answer": 0
        },
        {
            "type": "open",
            "options": ["Patty", "Alcmène", "Mégara", "Gaïa"],
            "question": "name of Hercules mother?",
            "answer": 1
        },
        {
            "type": "open",
            "options": [11,12,13,14],
            "question": "How many players per Cricket team?",
            "answer": 0
        },
        {
            "type": "open",
            "options": ["Portuguese", "French", "Nobody", "Spanish"],
            "question": "Who expected the spanish inquisition?",
            "answer": 2
        },
        {
            "type": "open",
            "options": [11,12,13,14],
            "question": "How many players per Cricket team?",
            "answer": 0
        },
        {
            "type": "open",
            "options": ["Green", "Blue", "Yellow", "Red"],
            "question": "What color is vermilion?",
            "answer": 3
        },
        {
            "type": "open",
            "options": ["3.12s", "9.64s", "9.58s", "14.58s"],
            "question": "What is Men's 100 metres world record?",
            "answer": 2
        },
        {
            "type": "open",
            "options": ["6.32s", "10.49s", "10.55s", "29.58s"],
            "question": "What is Women's 100 metres world record?",
            "answer": 1
        }
    ];
}