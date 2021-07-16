import React from 'react'

import ProfileList from './ProfileList'
import ProfileOption from './ProfileOption'

import { NavKey, Stack as NavStack } from './_navigator'

export default function ProfileSelectorView() {
    return (
        <NavStack.Navigator
            headerMode="none"
        >
            <NavStack.Screen name={NavKey.ProfileOption} component={ProfileOption} />
            <NavStack.Screen name={NavKey.ProfileList} component={ProfileList} />
        </NavStack.Navigator>
    )
}
