import { definePlugin, type InputProps } from 'sanity';

import { OsmGeopointInput } from './OsmGeopointInput';
import type { GeopointValue } from './types';

/**
 * Registers `OsmGeopointInput` as the Studio input for every `geopoint` field.
 * Prefer the named export on individual fields when only some maps should use OSM.
 */
export const osmInput = definePlugin({
  name: 'sanity-plugin-osm-input',
  form: {
    components: {
      input: (props: InputProps) => {
        if (props.schemaType.name === 'geopoint') {
          return (
            <OsmGeopointInput
              value={props.value as GeopointValue | undefined}
              readOnly={props.readOnly}
              onChange={props.onChange}
              elementProps={props.elementProps}
            />
          );
        }
        return props.renderDefault(props);
      },
    },
  },
});
