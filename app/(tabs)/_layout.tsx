import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name='index' options={{title: 'Home'}} />
            <Tabs.Screen name='matches' options={{title: 'History'}} />
            <Tabs.Screen name='summary' options={{title: 'Summary'}} />
        </Tabs>
    );
}