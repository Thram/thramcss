<forms>
    <div class="group">

        <div id="forms" class="unit-1">
            <h2 class="text-center">Forms</h2>
            <h3>Default Form</h3>
            <form>
                <fieldset>
                    <legend>A compact inline form</legend>

                    <input type="email" placeholder="Email">
                    <input type="password" placeholder="Password">

                    <label for="remember">
                        <input id="remember" type="checkbox"> Remember me
                    </label>

                    <button type="submit" class="button button-primary">Sign in</button>
                </fieldset>
            </form>
            <h3>Stacked Form</h3>
            <form class="form-stacked">
                <fieldset>
                    <legend>A Stacked Form</legend>

                    <label for="email">Email</label>
                    <input id="email" type="email" placeholder="Email">

                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Password">

                    <label for="state">State</label>
                    <select id="state">
                        <option>AL</option>
                        <option>CA</option>
                        <option>IL</option>
                    </select>

                    <label for="remember" class="checkbox">
                        <input id="remember" type="checkbox"> Remember me
                    </label>

                    <button type="submit" class="button button-primary">Sign in</button>
                </fieldset>
            </form>
            <h3>Aligned Form</h3>
            <form class="form-aligned">
                <fieldset>
                    <div class="control-group">
                        <label for="name">Username</label>
                        <input id="name" type="text" placeholder="Username">
                    </div>

                    <div class="control-group">
                        <label for="password">Password</label>
                        <input id="password" type="password" placeholder="Password">
                    </div>

                    <div class="control-group">
                        <label for="email">Email Address</label>
                        <input id="email" type="email" placeholder="Email Address">
                    </div>

                    <div class="control-group">
                        <label for="foo">Supercalifragilistic Label</label>
                        <input id="foo" type="text" placeholder="Enter something here...">
                    </div>

                    <div class="controls">
                        <label for="cb" class="checkbox">
                            <input id="cb" type="checkbox"> I've read the terms and conditions
                        </label>

                        <button type="submit" class="button button-primary">Submit</button>
                    </div>
                </fieldset>
            </form>
            <h3>Multi-Column Form (with ThramCSS Grids)</h3>
            <form class="form-stacked">
                <fieldset>
                    <legend>Legend</legend>

                    <div class="group">
                        <div class="unit-1 unit-md-8-24">
                            <label for="first-name">First Name</label>
                            <input id="first-name" class="unit-23-24" type="text">
                        </div>

                        <div class="unit-1 unit-md-8-24">
                            <label for="last-name">Last Name</label>
                            <input id="last-name" class="unit-23-24" type="text">
                        </div>

                        <div class="unit-1 unit-md-8-24">
                            <label for="email">E-Mail</label>
                            <input id="email" class="unit-23-24" type="email" required>
                        </div>

                        <div class="unit-1 unit-md-8-24">
                            <label for="city">City</label>
                            <input id="city" class="unit-23-24" type="text">
                        </div>

                        <div class="unit-1 unit-md-8-24">
                            <label for="state">State</label>
                            <select id="state" class="input-1-2">
                                <option>AL</option>
                                <option>CA</option>
                                <option>IL</option>
                            </select>
                        </div>
                    </div>

                    <label for="terms" class="checkbox">
                        <input id="terms" type="checkbox"> I've read the terms and conditions
                    </label>

                    <button type="submit" class="button button-primary">Submit</button>
                </fieldset>
            </form>
            <h3>Grouped Inputs</h3>
            <form>
                <fieldset class="form-group">
                    <input type="text" class="input-1-2" placeholder="Username">
                    <input type="text" class="input-1-2" placeholder="Password">
                    <input type="email" class="input-1-2" placeholder="Email">
                </fieldset>

                <fieldset class="form-group">
                    <input type="text" class="input-1-2" placeholder="A title">
                    <textarea class="input-1-2" placeholder="Textareas work too"></textarea>
                </fieldset>

                <button type="submit" class="button input-1-2 button-primary">Sign in</button>
            </form>
            <h3>Input Sizing</h3>
            <form>
                <input class="input-1" type="text" placeholder=".input-1"><br>
                <input class="input-2-3" type="text" placeholder=".input-2-3"><br>
                <input class="input-1-2" type="text" placeholder=".input-1-2"><br>
                <input class="input-1-3" type="text" placeholder=".input-1-3"><br>
                <input class="input-1-4" type="text" placeholder=".input-1-4"><br>
            </form>
            <form class="group">
                <div class="unit-1-4">
                    <input class="input-1" type="text" placeholder=".unit-1-4">
                </div>
                <div class="unit-3-4">
                    <input class="input-1" type="text" placeholder=".unit-3-4">
                </div>

                <div class="unit-1-2">
                    <input class="input-1" type="text" placeholder=".unit-1-2">
                </div>
                <div class="unit-1-2">
                    <input class="input-1" type="text" placeholder=".unit-1-2">
                </div>

                <div class="unit-1-8">
                    <input class="input-1" type="text" placeholder=".unit-1-8">
                </div>
                <div class="unit-1-8">
                    <input class="input-1" type="text" placeholder=".unit-1-8">
                </div>
                <div class="unit-1-4">
                    <input class="input-1" type="text" placeholder=".unit-1-4">
                </div>
                <div class="unit-1-2">
                    <input class="input-1" type="text" placeholder=".unit-1-2">
                </div>

                <div class="unit-1-5">
                    <input class="input-1" type="text" placeholder=".unit-1-5">
                </div>
                <div class="unit-2-5">
                    <input class="input-1" type="text" placeholder=".unit-2-5">
                </div>
                <div class="unit-2-5">
                    <input class="input-1" type="text" placeholder=".unit-2-5">
                </div>

                <div class="unit-1">
                    <input class="input-1" type="text" placeholder=".unit-1">
                </div>
            </form>
            <h3>Required Inputs</h3>
            <form>
                <input type="email" placeholder="Requires an email" required>
            </form>
            <h3>Disabled Inputs</h3>
            <form>
                <input type="text" placeholder="Disabled input here..." disabled>
            </form>
            <h3>Read-Only Inputs</h3>
            <form>
                <input type="text" value="Readonly input here..." readonly>
            </form>
            <h3>Rounded Inputs</h3>
            <form>
                <input type="text" class="input-rounded">
                <button type="submit" class="button">Search</button>
            </form>
            <h3>Checkboxes and Radios</h3>
            <form>
                <label for="option-one" class="checkbox">
                    <input id="option-one" type="checkbox" value="">
                    Here's option one.
                </label>

                <label for="option-two" class="radio">
                    <input id="option-two" type="radio" name="optionsRadios" value="option1" checked>
                    Here's a radio button. You can choose this one..
                </label>

                <label for="option-three" class="radio">
                    <input id="option-three" type="radio" name="optionsRadios" value="option2">
                    ..Or this one!
                </label>
            </form>
        </div>
    </div>
</forms>