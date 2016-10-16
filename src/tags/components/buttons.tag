<buttons>
    <div class="group">

        <div id="buttons" class="unit-1">
            <h2 class="text-center">Buttons</h2>
            <h3>Default Buttons</h3>
            <div>
                <a class="button" href="#">A Pure Button</a>
                <button class="button">A Pure Button</button>
            </div>
            <h3>Disabled Buttons</h3>
            <div>
                <a class="button button-disabled" href="#">A Disabled Button</a>
                <button class="button button-disabled">A Disabled Button</button>
            </div>
            <h3>Active Buttons</h3>
            <div>
                <a class="button button-active" href="#">An Active Button</a>
                <button class="button button-active">An Active Button</button>

            </div>
            <h3>Primary Buttons</h3>
            <div>
                <a class="button button-primary" href="#">A Primary Button</a>
                <button class="button button-primary">A Primary Button</button>
            </div>
            <h3>Customizing Buttons</h3>
            <div>
                <button class="button-success button">Success Button</button>
                <button class="button-error button">Error Button</button>
                <button class="button-warning button">Warning Button</button>
                <button class="button-secondary button">Secondary Button</button>
            </div>
            <h3>Buttons with different sizes</h3>
            <div>
                <button class="button-xsmall button">Extra Small Button</button>
                <button class="button-small button">Small Button</button>
                <button class="button">Regular Button</button>
                <button class="button-large button">Large Button</button>
                <button class="button-xlarge button">Extra Large Button</button>
            </div>
        </div>
    </div>
    <style scoped>
        .button-success,
        .button-error,
        .button-warning,
        .button-secondary {
            color: white;
            border-radius: 4px;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        }

        .button-success {
            background: rgb(28, 184, 65); /* this is a green */
        }

        .button-error {
            background: rgb(202, 60, 60); /* this is a maroon */
        }

        .button-warning {
            background: rgb(223, 117, 20); /* this is an orange */
        }

        .button-secondary {
            background: rgb(66, 184, 221); /* this is a light blue */
        }

        .button-xsmall {
            font-size: 70%;
        }

        .button-small {
            font-size: 85%;
        }

        .button-large {
            font-size: 110%;
        }

        .button-xlarge {
            font-size: 125%;
        }

    </style>

</buttons>