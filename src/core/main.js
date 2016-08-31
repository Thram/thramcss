import "modules/loader";
import {mount, route, mixin} from "riot";
import base from "mixins/base";

// Implement Base Mixin for all tags with common functionality
mixin(base);

route.base('/');

mount('app');
route.start(true);