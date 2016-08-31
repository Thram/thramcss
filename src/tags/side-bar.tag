<side-bar>
    <div class="side-bar group">
        <div class="unit-1">
            <div class="menu">
                <a class="menu-heading" href="/#">ThramCSS</a>
                <ul class="menu-list" each="{menu in menus}">
                    <li class="menu-item {parent.parent.opts.view === key && 'menu-selected'}"
                        each="{key, label in menu}">
                        <a href="#/{key}" class="menu-link">{label}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <script>
        var tag = this;

        tag.menus = [
            {
                start  : "Get Started",
                layouts: "Layouts"
            }, {
                base   : "Base",
                grids  : "Grids",
                forms  : "Forms",
                buttons: "Buttons",
                tables : "Tables",
                menus  : "Menus"
            }, {
                customize: "Customize"
            }
        ];

    </script>
</side-bar>