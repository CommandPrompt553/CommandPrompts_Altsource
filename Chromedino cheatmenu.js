(function() {
    // 1. Globale Variablen für den Bot und die Unsterblichkeit
    let botScriptLoaded = false;
    let originalGameOver = null;

    // 2. CSS-Styling für das Menü erstellen
    const style = document.createElement('style');
    style.textContent = `
        #dino-cheat-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            padding: 10px 15px;
            background: #333;
            color: #fff;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-family: Arial, sans-serif;
            font-weight: bold;
        }
        #dino-cheat-menu {
            position: fixed;
            top: 70px;
            right: 20px;
            z-index: 10000;
            background: rgba(240, 240, 240, 0.95);
            border: 2px solid #333;
            padding: 15px;
            border-radius: 8px;
            display: none;
            flex-direction: column;
            gap: 10px;
            font-family: Arial, sans-serif;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            width: 220px;
        }
        #dino-cheat-menu button {
            padding: 8px;
            background: #fff;
            border: 1px solid #999;
            cursor: pointer;
            border-radius: 4px;
            font-weight: 500;
        }
        #dino-cheat-menu button:hover {
            background: #ddd;
        }
        #dino-bot-checkbox-container {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10001;
            background: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 10px 20px;
            border-radius: 20px;
            font-family: Arial, sans-serif;
            display: none;
            align-items: center;
            gap: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        #dino-bot-checkbox-container input {
            cursor: pointer;
            scale: 1.2;
        }
    `;
    document.head.appendChild(style);

    // 3. UI-Elemente erstellen
    // Toggle-Button oben rechts
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'dino-cheat-toggle';
    toggleBtn.textContent = 'Cheat Menü';
    document.body.appendChild(toggleBtn);

    // Das eigentliche Menü
    const menu = document.createElement('div');
    menu.id = 'dino-cheat-menu';
    document.body.appendChild(menu);

    // Bot-Checkbox Container (unten Mitte)
    const botContainer = document.createElement('div');
    botContainer.id = 'dino-bot-checkbox-container';
    botContainer.innerHTML = '<label><input type="checkbox" id="dino-bot-checkbox"> JumpBot Aktivieren</label>';
    document.body.appendChild(botContainer);

    const botCheckbox = document.getElementById('dino-bot-checkbox');

    // 4. Buttons im Menü hinzufügen
    // "Load Bot" Button
    const loadBotBtn = document.createElement('button');
    loadBotBtn.textContent = 'Load Bot';
    menu.appendChild(loadBotBtn);

    // "Make dino immortal" Button
    const immortalBtn = document.createElement('button');
    immortalBtn.textContent = 'make dino immortal';
    menu.appendChild(immortalBtn);

    // "Nvm don't make dino immortal" Button
    const mortalBtn = document.createElement('button');
    mortalBtn.textContent = 'nvm don’t make dino immortal';
    menu.appendChild(mortalBtn);

    // "Reset" Button
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'reset';
    resetBtn.style.backgroundColor = '#ffcccc';
    menu.appendChild(resetBtn);


    // 5. Funktionen und Event-Listener
    // Menü öffnen/schließen
    toggleBtn.addEventListener('click', () => {
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'flex';
        } else {
            menu.style.display = 'none';
        }
    });

    // Bot-Bereich einblenden
    loadBotBtn.addEventListener('click', () => {
        botContainer.style.display = 'flex';
    });

    // Hilfsfunktion um das Skript dynamisch nachzuladen
    function loadBotScript(callback) {
        const script = document.createElement('script');
        script.src = 'https://commandprompt553.github.io/CommandPrompts_Altsource/jumpbot.js';
        script.onload = () => {
            botScriptLoaded = true;
            if (callback) callback();
        };
        document.body.appendChild(script);
    }

    // Checkbox Logik
    botCheckbox.addEventListener('change', () => {
        if (botCheckbox.checked) {
            if (!botScriptLoaded) {
                // Das erste Mal: Script laden und es startet sich durch den internen Code selbst
                loadBotScript();
            } else {
                // Wenn das Script schon geladen war, müssen wir den Code manuell neu triggern.
                // Da jumpbot.js beim Laden normalerweise direkt ein Intervall namens 'botInterval' startet,
                // führen wir den Code, der im File steht, hier einfach als Text/Funktion neu aus.
                // Wir holen uns den Code frisch oder simulieren den Start (falls im Script 'bot = setInterval(...)' o.ä. steht).
                // Falls dein Script eine feste Funktion zum Starten hat, könnte man die hier aufrufen.
                // Da wir das nicht genau wissen, laden wir das Script einfach via fetch neu in den Speicher:
                fetch('https://commandprompt553.github.io/CommandPrompts_Altsource/jumpbot.js')
                    .then(response => response.text())
                    .then(code => {
                        eval(code); // Führt den Bot-Code sauber neu aus
                    });
            }
        } else {
            // Wenn ausgecheckt: Bot stoppen
            if (typeof botInterval !== 'undefined') {
                clearInterval(botInterval);
            }
            bot = null;
        }
    });

    // Unsterblichkeit aktivieren
    immortalBtn.addEventListener('click', () => {
        if (typeof Runner !== 'undefined' && Runner.prototype) {
            if (!originalGameOver) {
                originalGameOver = Runner.prototype.gameOver;
            }
            Runner.prototype.gameOver = function() {};
            alert('Dino ist jetzt unsterblich!');
        } else {
            alert('Runner-Klasse nicht gefunden. Bist du auf der richtigen Seite?');
        }
    });

    // Unsterblichkeit deaktivieren
    mortalBtn.addEventListener('click', () => {
        if (typeof Runner !== 'undefined' && Runner.prototype && originalGameOver) {
            Runner.prototype.gameOver = originalGameOver;
            alert('Dino ist wieder sterblich.');
        }
    });

    // Seite neu laden (Reset)
    resetBtn.addEventListener('click', () => {
        location.reload();
    });

})();
