package io.afyabora;
// import io.afyabora.generated.BasePackageList;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Arrays;

import androidx.multidex.MultiDexApplication;
import java.lang.Class;
import java.util.ArrayList;

// import org.devio.rn.splashscreen.SplashScreenReactPackage;

import com.facebook.react.bridge.JSIModulePackage;

// for in app-browser
import com.proyecto26.inappbrowser.RNInAppBrowserPackage;

// import com.swmansion.reanimated.ReanimatedJSIModulePackage;

// import org.unimodules.adapters.react.ModuleRegistryAdapter;
// import org.unimodules.adapters.react.ReactModuleRegistryProvider;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  // private final ReactModuleRegistryProvider mModuleRegistryProvider = new
  // ReactModuleRegistryProvider(new BasePackageList().getPackageList(), null);
  private ArrayList<Class> runningActivities = new ArrayList<>();

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for
      // example:
      // packages.add(new MyReactNativePackage());
      // packages.add(new
      // CodePush(getResources().getString(R.string.CodePushDeploymentKey),
      // MainApplication.this, BuildConfig.DEBUG));
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    // @Override
    // protected JSIModulePackage getJSIModulePackage() {
    // return new ReanimatedJSIModulePackage();
    // }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method
   * with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         * We use reflection here to pick up the class that initializes Flipper,
         * since Flipper library is not available in release mode
         */
        Class<?> aClass = Class.forName("io.afyabora.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }

  public void addActivityToStack(Class cls) {
    if (!runningActivities.contains(cls))
      runningActivities.add(cls);
  }

  public void removeActivityFromStack(Class cls) {
    if (runningActivities.contains(cls))
      runningActivities.remove(cls);
  }

  public boolean isActivityInBackStack(Class cls) {
    return runningActivities.contains(cls);
  }

}
