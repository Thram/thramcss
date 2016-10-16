<top-bar>
    <div class="header">
        <div class="menu menu-horizontal">
            <a class="menu-heading" href="/#"><h1 class="text-center">ThramCSS</h1></a>
            <ul class="menu-list" each="{menu in menus}">
                <li class="menu-item {parent.parent.opts.view === key && 'menu-selected'}"
                    each="{key, label in menu}">
                    <a href="#{key}" class="menu-link">{label}</a>
                </li>
            </ul>
        </div>
    </div>
    <script>
        var tag = this;

        tag.menus = [
            {
                start  : "Get Started"
            }, {
                base   : "Base",
                grids  : "Grids",
                forms  : "Forms",
                buttons: "Buttons",
                tables : "Tables",
                menus  : "Menus"
            }, {
                customize: "Customize",
                examples: "Examples"
            }
        ];

    </script>
</top-bar>