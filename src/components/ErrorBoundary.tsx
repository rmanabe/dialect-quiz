import { Component, type ErrorInfo, type ReactNode } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { getPrefectureConfig } from '../prefectures';
import { errorScreenTheme } from './errorScreenTheme';

// Without this, any render error anywhere in the tree takes the whole app down
// — the user sees a crash, and App Review sees an app that quits. With it they
// see a screen they can retry from. Deliberately depends on nothing but
// react-native and the prefecture theme, so it cannot itself fail to load.

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Keep this even in production: it is the only trace of what happened when
    // a user reports "the app went white".
    console.error('[ErrorBoundary]', error?.message, info?.componentStack);
  }

  handleRetry = () => {
    // Remounting the subtree is usually enough — most crashes here come from
    // transient state, not from something permanently broken.
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    // Guarded and tested in errorScreenTheme: this screen exists precisely
    // because things go wrong, so reading the theme must not be the next thing
    // that does.
    const { background, primary } = errorScreenTheme(() => getPrefectureConfig().theme);

    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <Text style={styles.title}>問題が発生しました</Text>
        <Text style={styles.body}>
          申し訳ありません。画面の表示中にエラーが発生しました。{'\n'}
          「もう一度試す」を押すか、アプリを開き直してください。
        </Text>
        <Pressable
          style={[styles.button, { backgroundColor: primary }]}
          onPress={this.handleRetry}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>もう一度試す</Text>
        </Pressable>
        {__DEV__ && <Text style={styles.detail}>{error.message}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5A3B1E',
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    color: '#7A5B3E',
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  detail: {
    marginTop: 16,
    fontSize: 11,
    color: '#B4A385',
    textAlign: 'center',
  },
});
