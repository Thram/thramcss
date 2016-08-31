/**
 * Created by thram on 18/06/16.
 */
import {mount} from "riot";

export default {
  init: function () {
    let tag = this,
        tagName,
        viewTag;

    const enterView = () => {
      tagName = tag.opts.tag;
      if (viewTag) viewTag.unmount(true);
      viewTag        = mount(tag.main, tag.opts.tag, tag.opts.params)[0];
      viewTag.parent = tag;
      tag.update({viewClass: tagName});
    };

    tag.on('update', () => tag.isMounted && tag.opts.tag && tagName != tag.opts.tag && enterView());
  }
};
