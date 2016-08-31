<router>
    <div class="group router-container">
        <div class="unit-2-24">
            <side-bar view="{view}"></side-bar>
        </div>
        <div class="unit-22-24">
            <view tag="{view}-view" params="{params}"></view>
        </div>
    </div>

    <script>
        this.mixin(require('mixins/router').default);
    </script>
</router>