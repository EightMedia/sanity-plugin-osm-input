import { definePlugin, type InputProps, type ObjectInputProps } from 'sanity';

import { OsmGeopointInput } from './OsmGeopointInput';
import type { GeopointValue } from './types';

/**
 * Registers `OsmGeopointInput` as the Studio input for every `geopoint` field.
 * Prefer the named export on individual fields when only some maps should use OSM.
 */
export const osmInput = definePlugin({
  name: 'sanity-osm-input',
  form: {
    components: {
      input: (props: InputProps) => {
        if (props.schemaType.name === 'geopoint') {
          return (
            <OsmGeopointInput
              {...(props as ObjectInputProps<GeopointValue>)}
            />
          );
        }
        return props.renderDefault(props);
      },
    },
  },
});
