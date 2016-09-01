<router>
    <div class="group router-container">
        <div class="unit-6-24 unit-sm-5-24 unit-md-4-24 unit-lg-3-24 unit-xl-2-24">
            <side-bar view="{view}"></side-bar>
        </div>
        <div class="unit-18-24 unit-sm-19-24 unit-md-20-24 unit-lg-21-24 unit-xl-22-24">
            <view tag="{view}-view" params="{params}"></view>
        </div>
    </div>

    <script>
        this.mixin(require('mixins/router').default);
    </script>
</router>