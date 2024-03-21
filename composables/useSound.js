import { Howl } from "howler";

function useSound(
    url,
    {
        volume = 1,
        playbackRate = 1,
        soundEnabled = true,
        interrupt = false,
        autoplay = false,
        onload,
        ...delegated
    } = {}
) {
    const HowlConstructor = ref(null);
    const isPlaying = ref(false);
    const duration = ref(null);
    const sound = ref(null);

    function handleLoad() {
        if (typeof onload === "function") onload.call(this);
        duration.value = (duration.value || sound.value?.duration() || 0) * 1e3;
        if (autoplay === true) {
            isPlaying.value = true;
        }
    }

    const onVolumeChange = (volume, playbackRate) => {
        if (sound.value) {
            sound.value.volume(unref(volume));
        }
        if (sound.value && playbackRate) {
            sound.value.rate(unref(playbackRate));
        }
    };

    onMounted(async () => {
        HowlConstructor.value = Howl;
        sound.value = new HowlConstructor.value({
            src: unref(url),
            volume: unref(volume),
            rate: unref(playbackRate),
            onload: handleLoad,
            ...delegated,
        });
    });

    const onSrcChange = (newUrl, newVolume) => {
        isPlaying.value = false;
        sound.value.unload();
        if (
            HowlConstructor.value &&
            HowlConstructor.value &&
            sound &&
            sound.value
        ) {
            sound.value = new HowlConstructor.value({
                src: unref(newUrl),
                volume: unref(newVolume),
                rate: unref(playbackRate),
                onload: handleLoad,
                ...delegated,
            });
            isPlaying.value = true;
        }
    };

    const play = (options) => {
        if (typeof options === "undefined") {
            options = {};
        }
        if (!sound.value || (!soundEnabled && !options.forceSoundEnabled)) {
            return;
        }
        if (interrupt) {
            sound.value.stop();
        }
        if (options.playbackRate) {
            sound.value.rate(options.playbackRate);
        }
        sound.value.play(options.id);
        sound.value.once("end", () => {
            if (sound.value && sound.value && !sound.value.playing()) {
                isPlaying.value = false;
            }
        });
        isPlaying.value = true;
    };
    const stop = (id) => {
        if (!sound.value) {
            return;
        }
        sound.value.stop(typeof id === "number" ? id : void 0);
        isPlaying.value = false;
    };
    const pause = (id) => {
        if (!sound.value) {
            return;
        }
        sound.value.pause(typeof id === "number" ? id : void 0);
        isPlaying.value = false;
    };
    const returnedValue = {
        play,
        sound,
        isPlaying,
        duration,
        pause,
        stop,
        onVolumeChange,
        onSrcChange,
    };
    return returnedValue;
}

export { useSound };
