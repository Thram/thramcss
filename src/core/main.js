import "modules/loader";
import {BASE_URL} from "modules/constants";
import {mount, route, mixin} from "riot";
import base from "mixins/base";

// Implement Base Mixin for all tags with common functionality
mixin(base);

route.base(BASE_URL);

mount('app');
route.start(true);