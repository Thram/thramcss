<grids>
    <div class="group">
        <div id="grids" class="unit-1">
            <h2 class="text-center">Grids</h2>
            <h3>Basics</h3>
            <p>For hiding columns use <strong>unit-0</strong></p>
            <p>For full-width columns use <strong>unit-1</strong></p>
            <p>
                Then we have 2 different base units for grids:
            <ul>
                <li>5 columns</li>
                <li>24 columns</li>
            </ul>
            </p>
            <h3>5ths-Based Units</h3>
            <div class="group">
                <div class="unit-1" each="{size in grids.grid_5}">
                    <div class="u-label">{size}-5</div>
                    <div class="u-example">
                        <div class="group">
                            <div class="unit-{size}-5 grid-units-item">&nbsp;</div>
                        </div>
                    </div>
                </div>
            </div>
            <h3>24ths-Based Units</h3>
            <div class="group">
                <div class="unit-1" each="{size in grids.grid_24}">
                    <div class="u-label">{size}-24</div>
                    <div class="u-example">
                        <div class="group">
                            <div class="unit-{size}-24 grid-units-item">&nbsp;</div>
                        </div>
                    </div>
                </div>
            </div>
            <h3>Default Media Queries</h3>
            <div class="table-responsive">
                <table class="table-bordered table">
                    <thead>
                    <tr>
                        <th class="highlight">Key</th>
                        <th class="highlight">CSS Media Query</th>
                        <th>Applies</th>
                        <th>Classname</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td class="highlight"><i>None</i></td>
                        <td class="highlight"><i>None</i></td>
                        <td><i>Always</i></td>
                        <td><code>.unit-*</code></td>
                    </tr>


                    <tr>
                        <td class="highlight"><b><code>sm</code></b></td>
                        <td class="mq-table-mq highlight"><code>@media screen and (min-width: 35.5em)</code></td>
                        <td>≥ <b>568px</b></td>
                        <td><code>.unit-<b>sm</b>-*</code></td>
                    </tr>

                    <tr>
                        <td class="highlight"><b><code>md</code></b></td>
                        <td class="mq-table-mq highlight"><code>@media screen and (min-width: 48em)</code></td>
                        <td>≥ <b>768px</b></td>
                        <td><code>.unit-<b>md</b>-*</code></td>
                    </tr>

                    <tr>
                        <td class="highlight"><b><code>lg</code></b></td>
                        <td class="mq-table-mq highlight"><code>@media screen and (min-width: 64em)</code></td>
                        <td>≥ <b>1024px</b></td>
                        <td><code>.unit-<b>lg</b>-*</code></td>
                    </tr>

                    <tr>
                        <td class="highlight"><b><code>xl</code></b></td>
                        <td class="mq-table-mq highlight"><code>@media screen and (min-width: 80em)</code></td>
                        <td>≥ <b>1280px</b></td>
                        <td><code>.unit-<b>xl</b>-*</code></td>
                    </tr>

                    </tbody>
                </table>

            </div>
        </div>
    </div>
    <script>

        var tag   = this;
        tag.grids = {
            grid_5 : _.times(5, function (index) {
                return index + 1;
            }),
            grid_24: _.times(24, function (index) {
                return index + 1;
            })
        }

    </script>
</grids>