;(function() {

    class Notifications {
        constructor(arrOfStrings = []) {
            this._arrOfStrings = arrOfStrings; 
            this._counter = this._arrOfStrings.length - 1;
            this._arrStatuses = [];
        }

        start() {
            if (window.localStorage.disableTips) return;

            let mainDiv = document.createElement('div');
            let tipsDiv = document.createElement('div');
            let closeButton = document.createElement('div');
            let disableTipsInput = document.createElement('input');
            let label = document.createElement('label');
            let leftControlButton = document.createElement('div');
            let rightControlButton = document.createElement('div');
            let footer = document.createElement('footer');
            let arrOfStatuses = [];
            let self = this;
            
            this._arrOfStrings.forEach( (elem, i) => arrOfStatuses[i] = document.createElement('div') );

            mainDiv.className = 'notifications';
            mainDiv.tabIndex = '1';
            tipsDiv.className = 'information';
            tipsDiv.textContent = this._arrOfStrings[0];
            mainDiv.appendChild(tipsDiv);
            closeButton.className = 'close-button';
            closeButton.textContent = 'X';
            mainDiv.appendChild(closeButton);
            footer.className = 'footer';
            mainDiv.appendChild(footer);
            disableTipsInput.className = 'disable-checkbox';
            disableTipsInput.type = 'checkbox';
            disableTipsInput.id = '1';
            footer.appendChild(disableTipsInput);
            label.htmlFor = '1';
            label.className = 'label-of-disable-checkbox';
            label.textContent = 'Disable Tips';
            footer.appendChild(label);
            rightControlButton.className = 'right-control-button';
            rightControlButton.textContent = ">";
            footer.appendChild(rightControlButton);
            
            arrOfStatuses.forEach( (elem, i, arr) => {
                if (i != arr.length - 1) { 
                    elem.className = 'arr-statuses deactive';
                    footer.appendChild(elem);
                } else {
                    elem.className = 'arr-statuses active';
                    footer.appendChild(elem);
                }
            });

            leftControlButton.className = 'left-control-button';
            leftControlButton.textContent = "<";
            footer.appendChild(leftControlButton);
            document.body.appendChild(mainDiv);

            this._arrStatuses = mainDiv.querySelectorAll('div[class^="arr"]');
            
            mainDiv.focus();
            mainDiv.addEventListener('click', e => self.handlerMouse(e), false);
            mainDiv.addEventListener('keydown', e => self.handlerKeyboard(e), false);
        }

        handlerMouse(e) {
            if ( e.target.closest('.close-button') ) {
                e.currentTarget.hidden = true;
            }

            if (e.target.className === 'disable-checkbox' || e.target.className === 'label-of-disable-checkbox') {
                window.localStorage.disableTips = !window.localStorage.disableTips;
            }

            if (e.target.className === 'right-control-button') {
                
                if (this._counter === 0) {
                    this._counter = this._arrStatuses.length - 1;
                } else {
                    this._counter--;
                }

                e.currentTarget.querySelector('.information').textContent = this._arrOfStrings[this._arrStatuses.length - 1 - this._counter];
                this._arrStatuses[this._counter].className = 'arr-statuses active';
                if (this._counter === this._arrStatuses.length - 1) {
                    this._arrStatuses[0].className = 'arr-statuses deactive';
                } else {
                    this._arrStatuses[this._counter + 1].className = 'arr-statuses deactive';
                }
            }

            if (e.target.className === 'left-control-button') {
                
                if (this._counter === this._arrStatuses.length - 1) {
                    this._counter = 0;
                } else {
                    this._counter++;
                }

                e.currentTarget.querySelector('.information').textContent = this._arrOfStrings[this._arrStatuses.length - 1 - this._counter];
                this._arrStatuses[this._counter].className = 'arr-statuses active';
                if (this._counter === 0) {
                    this._arrStatuses[this._arrStatuses.length - 1].className = 'arr-statuses deactive';
                } else {
                    this._arrStatuses[this._counter - 1].className = 'arr-statuses deactive';
                }
            }
        }

        handlerKeyboard(e) {
            if ( e.target.closest('.notifications') ) {
                if (e.keyCode === 39) {
                let customEvent = new Event('click', {cancelable: true, bubbles: true});
                e.currentTarget.querySelector('.right-control-button').dispatchEvent(customEvent);
                }

                if (e.keyCode === 37) {
                    let customEvent = new Event('click', {cancelable: true, bubbles: true});
                    e.currentTarget.querySelector('.left-control-button').dispatchEvent(customEvent);
                }
            }
        }
    }

    let notifications = new Notifications([
        'Since apartheid ended, African National Congress leaders have siphoned off tens of billions of dollars.',
        'Comey Calls Trump a Serial Liar and ‘Stain’ on Colleagues.',
        '25-Year-Old Textbooks and Holes in the Ceiling: Inside America’s Public Schools.',
        'The strikes were calibrated to keep the West from being dragged further into war.',
        'It’s now a classic, with a splashy revival about to open on Broadway.',
        'News Analysis: After Trump Strikes Syria, Syrians Wonder ‘What’s Next?’ ',
        'The strikes were calibrated to keep the West from being dragged further into war.',
        'It’s now a classic, with a splashy revival about to open on Broadway.',
        'News Analysis: After Trump Strikes Syria, Syrians Wonder ‘What’s Next?’ ',
        'The strikes were calibrated to keep the West from being dragged further into war.',
    ]);

    setTimeout( () => notifications.start(), 5000 );
    
})();
