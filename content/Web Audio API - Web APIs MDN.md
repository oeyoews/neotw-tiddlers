The Web Audio API provides a powerful and versatile system for controlling audio on the Web, allowing developers to choose audio sources, add effects to audio, create audio visualizations, apply spatial effects (such as panning) and much more.Web Audio API 提供了一个功能强大且用途广泛的系统，用于控制 Web 上的音频，允许开发人员选择音频源、为音频添加效果、创建音频可视化、应用空间效果（如平移）等等。

## [Web audio concepts and usageWeb 音频概念和用法](#web_audio_concepts_and_usage)

The Web Audio API involves handling audio operations inside an **audio context**, and has been designed to allow **modular routing**. Basic audio operations are performed with **audio nodes**, which are linked together to form an **audio routing graph**. Several sources — with different types of channel layout — are supported even within a single context. This modular design provides the flexibility to create complex audio functions with dynamic effects.Web 音频 API 涉及处理音频上下文中的音频操作，并且旨在允许模块化路由。基本的音频操作是通过音频节点执行的，这些节点链接在一起形成音频路由图。即使在单个上下文中，也支持具有不同类型通道布局的多个源。这种模块化设计提供了创建具有动态效果的复杂音频功能的灵活性。

Audio nodes are linked into chains and simple webs by their inputs and outputs. They typically start with one or more sources. Sources provide arrays of sound intensities (samples) at very small timeslices, often tens of thousands of them per second. These could be either computed mathematically (such as [`OscillatorNode`](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode)), or they can be recordings from sound/video files (like [`AudioBufferSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode) and [`MediaElementAudioSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/MediaElementAudioSourceNode)) and audio streams ([`MediaStreamAudioSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioSourceNode)). In fact, sound files are just recordings of sound intensities themselves, which come in from microphones or electric instruments, and get mixed down into a single, complicated wave. 音频节点通过其输入和输出链接到链和简单的网络中。它们通常从一个或多个来源开始。声源以非常小的时间片（通常每秒数万个）提供声强（样本）阵列。这些可以是数学计算的（例如 `OscillatorNode` ），也可以是来自声音 / 视频文件（如 `AudioBufferSourceNode` 和 ）和 `MediaElementAudioSourceNode` 音频流 （ `MediaStreamAudioSourceNode` ） 的录制。事实上，声音文件只是声音强度本身的记录，它们来自麦克风或电子乐器，并被混合成一个单一的、复杂的波。

Outputs of these nodes could be linked to inputs of others, which mix or modify these streams of sound samples into different streams. A common modification is multiplying the samples by a value to make them louder or quieter (as is the case with [`GainNode`](https://developer.mozilla.org/en-US/docs/Web/API/GainNode)). Once the sound has been sufficiently processed for the intended effect, it can be linked to the input of a destination ([`BaseAudioContext.destination`](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/destination)), which sends the sound to the speakers or headphones. This last connection is only necessary if the user is supposed to hear the audio. 这些节点的输出可以链接到其他节点的输入，后者将这些声音样本流混合或修改为不同的流。一种常见的修改是将样本乘以一个值，使它们更响亮或更安静（如 `GainNode` ）。一旦声音经过充分处理以达到预期效果，就可以将其链接到目的地 （ `BaseAudioContext.destination` ） 的输入，该输入将声音发送到扬声器或耳机。仅当用户应该听到音频时，才需要最后一个连接。

A simple, typical workflow for web audio would look something like this:Web 音频的简单、典型的工作流程如下所示：

1. Create audio context 创建音频上下文
2. Inside the context, create sources — such as `<audio>`, oscillator, stream 在上下文中，创建源，例如 `<audio>` 、 振荡器、流
3. Create effects nodes, such as reverb, biquad filter, panner, compressor 创建效果节点，例如混响、双二阶滤波器、声像器、压缩器
4. Choose final destination of audio, for example your system speakers 选择音频的最终目的地，例如您的系统扬声器
5. Connect the sources up to the effects, and the effects to the destination. 将源连接到效果，并将效果连接到目标。

![A simple box diagram with an outer box labeled Audio context, and three inner boxes labeled Sources, Effects and Destination. The three inner boxes have arrows between them pointing from left to right, indicating the flow of audio information.](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/audio-context_.png)

Timing is controlled with high precision and low latency, allowing developers to write code that responds accurately to events and is able to target specific samples, even at a high sample rate. So applications such as drum machines and sequencers are well within reach. 时序以高精度和低延迟进行控制，使开发人员能够编写准确响应事件的代码，并且即使在高采样率下也能够针对特定样本。因此，鼓机和音序器等应用触手可及。

The Web Audio API also allows us to control how audio is *spatialized*. Using a system based on a *source-listener model*, it allows control of the *panning model* and deals with *distance-induced attenuation* induced by a moving source (or moving listener).Web Audio API 还允许我们控制音频的空间化方式。使用基于源 - 听器模型的系统，它允许控制平移模型，并处理由移动源（或移动听器）引起的距离引起的衰减。

**Note:** You can read about the theory of the Web Audio API in a lot more detail in our article [Basic concepts behind Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API). 注意：您可以在我们的文章 Web 音频 API 背后的基本概念中更详细地了解 Web 音频 API 的理论。

## [Web Audio API target audienceWeb Audio API 目标受众](#web_audio_api_target_audience)

The Web Audio API can seem intimidating to those that aren't familiar with audio or music terms, and as it incorporates a great deal of functionality it can prove difficult to get started if you are a developer. 对于那些不熟悉音频或音乐术语的人来说，Web Audio API 似乎令人生畏，并且由于它包含大量功能，因此如果您是开发人员，则很难上手。

It can be used to incorporate audio into your website or application, by [providing atmosphere like futurelibrary.no](https://www.futurelibrary.no/), or [auditory feedback on forms](https://css-tricks.com/form-validation-web-audio/). However, it can also be used to create *advanced* interactive instruments. With that in mind, it is suitable for both developers and musicians alike. 它可用于通过提供 futurelibrary.no 等氛围或表单上的听觉反馈，将音频合并到您的网站或应用程序中。但是，它也可以用于创建高级交互式工具。考虑到这一点，它既适合开发人员，也适合音乐家。

We have a [simple introductory tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API) for those that are familiar with programming but need a good introduction to some of the terms and structure of the API. 我们为那些熟悉编程但需要很好地介绍 API 的一些术语和结构的人提供了一个简单的入门教程。

There's also a [Basic Concepts Behind Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API) article, to help you understand the way digital audio works, specifically in the realm of the API. This also includes a good introduction to some of the concepts the API is built upon. 还有一篇 Web 音频 API 背后的基本概念文章，可帮助您了解数字音频的工作方式，特别是在 API 领域。这还包括对 API 所基于的一些概念的良好介绍。

Learning coding is like playing cards — you learn the rules, then you play, then you go back and learn the rules again, then you play again. So if some of the theory doesn't quite fit after the first tutorial and article, there's an [advanced tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques) which extends the first one to help you practice what you've learnt, and apply some more advanced techniques to build up a step sequencer. 学习编程就像打牌一样 —— 你学会了规则，然后你玩了，然后你回去再学一遍规则，然后你再玩一遍。因此，如果在第一个教程和文章之后，某些理论不太合适，那么有一个高级教程可以扩展第一个教程，以帮助您练习所学知识，并应用一些更高级的技术来构建步进序列器。

We also have other tutorials and comprehensive reference material available that covers all features of the API. See the sidebar on this page for more. 我们还提供其他教程和全面的参考资料，涵盖 API 的所有功能。有关详细信息，请参阅此页面上的侧边栏。

If you are more familiar with the musical side of things, are familiar with music theory concepts, want to start building instruments, then you can go ahead and start building things with the advanced tutorial and others as a guide (the above-linked tutorial covers scheduling notes, creating bespoke oscillators and envelopes, as well as an LFO among other things.) 如果你更熟悉音乐方面的东西，熟悉音乐理论的概念，想开始构建乐器，那么你可以继续以高级教程和其他教程为指导开始构建东西（上面链接的教程包括调度笔记，创建定制的振荡器和包络，以及 LFO 等。

If you aren't familiar with the programming basics, you might want to consult some beginner's JavaScript tutorials first and then come back here — see our [Beginner's JavaScript learning module](https://developer.mozilla.org/en-US/docs/Learn/JavaScript) for a great place to begin. 如果您不熟悉编程基础知识，您可能需要先查阅一些初学者的 JavaScript 教程，然后再回到这里 —— 请参阅我们的初学者 JavaScript 学习模块，这是一个很好的起点。

## [Web Audio API interfacesWeb 音频 API 接口](#web_audio_api_interfaces)

The Web Audio API has a number of interfaces and associated events, which we have split up into nine categories of functionality.Web Audio API 具有许多接口和相关事件，我们将其分为九类功能。

### [General audio graph definition 一般音频图定义](#general_audio_graph_definition)

General containers and definitions that shape audio graphs in Web Audio API usage. 在 Web 音频 API 用法中塑造音频图的常规容器和定义。

* [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)

  The **`AudioContext`** interface represents an audio-processing graph built from audio modules linked together, each represented by an [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode). An audio context controls the creation of the nodes it contains and the execution of the audio processing, or decoding. You need to create an `AudioContext` before you do anything else, as everything happens inside a context. 该 `AudioContext` 接口表示由链接在一起的音频模块构建的音频处理图，每个模块由 `AudioNode` . 音频上下文控制其包含的节点的创建以及音频处理或解码的执行。在执行其他任何操作 `AudioContext` 之前，您需要创建一个，因为一切都发生在上下文中。

* [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode)

  The **`AudioNode`** interface represents an audio-processing module like an *audio source* (e.g. an HTML [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) or [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) element), *audio destination*, *intermediate processing module* (e.g. a filter like [`BiquadFilterNode`](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode), or *volume control* like [`GainNode`](https://developer.mozilla.org/en-US/docs/Web/API/GainNode)). 该 `AudioNode` 接口表示音频处理模块，如音频源（如 HTML `<audio>` 或元素）、音频目标、中间处理模块（如过滤器，如，或 `<video>` 音量控制 `BiquadFilterNode` `GainNode` ，如）。

* [`AudioParam`](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam)

  The **`AudioParam`** interface represents an audio-related parameter, like one of an [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode). It can be set to a specific value or a change in value, and can be scheduled to happen at a specific time and following a specific pattern. 该 `AudioParam` 接口表示与音频相关的参数，例如 `AudioNode` . 它可以设置为特定值或值更改，并且可以计划为在特定时间并遵循特定模式发生。

* [`AudioParamMap`](https://developer.mozilla.org/en-US/docs/Web/API/AudioParamMap)

  Provides a map-like interface to a group of [`AudioParam`](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam) interfaces, which means it provides the methods `forEach()`, `get()`, `has()`, `keys()`, and `values()`, as well as a `size` property. 为一组接口提供类似映射的 `AudioParam` 接口，这意味着它提供方法 `forEach()` 、 、 `get()` 、 `has()` `keys()` 和 `values()` 以及属性 `size` 。

* [`BaseAudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext)

  The **`BaseAudioContext`** interface acts as a base definition for online and offline audio-processing graphs, as represented by [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) and [`OfflineAudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext) respectively. You wouldn't use `BaseAudioContext` directly — you'd use its features via one of these two inheriting interfaces. 该 `BaseAudioContext` 接口充当在线和离线音频处理图的基本定义，分别由 `AudioContext` 和 `OfflineAudioContext` 表示。你不会直接使用 `BaseAudioContext` ，而是通过这两个继承接口之一来使用它的功能。

* [The ](#the)[`ended`](https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode/ended_event "ended") event 活动 `ended`

  The `ended` event is fired when playback has stopped because the end of the media was reached. 当播放停止时，将触发该事件， `ended` 因为已到达媒体的末尾。

### [Defining audio sources 定义音频源](#defining_audio_sources)

Interfaces that define audio sources for use in the Web Audio API. 定义用于 Web 音频 API 的音频源的接口。

* [`AudioScheduledSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode)

  The **`AudioScheduledSourceNode`** is a parent interface for several types of audio source node interfaces. It is an [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode). 是 `AudioScheduledSourceNode` 多种类型的音频源节点接口的父接口。这是一个 `AudioNode` .

* [`OscillatorNode`](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode)

  The **`OscillatorNode`** interface represents a periodic waveform, such as a sine or triangle wave. It is an [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode) audio-processing module that causes a given *frequency* of wave to be created. 该 `OscillatorNode` 接口表示周期波形，例如正弦波或三角波。它是一个 `AudioNode` 音频处理模块，可产生给定频率的波。

* [`AudioBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer)

  The **`AudioBuffer`** interface represents a short audio asset residing in memory, created from an audio file using the [`BaseAudioContext.decodeAudioData`](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData) method, or created with raw data using [`BaseAudioContext.createBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createBuffer). Once decoded into this form, the audio can then be put into an [`AudioBufferSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode). 该 `AudioBuffer` 接口表示驻留在内存中的短音频资产，使用该 `BaseAudioContext.decodeAudioData` 方法从音频文件创建，或使用 `BaseAudioContext.createBuffer` 使用原始数据创建。一旦解码成这种形式，就可以将音频放入 `AudioBufferSourceNode` .

* [`AudioBufferSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode)

  The **`AudioBufferSourceNode`** interface represents an audio source consisting of in-memory audio data, stored in an [`AudioBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer). It is an [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode) that acts as an audio source. 该 `AudioBufferSourceNode` 接口表示由存储器中的音频数据组成的音频源，存储在 `AudioBuffer` . 它是一种 `AudioNode` 充当音频源的信号源。

* [`MediaElementAudioSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/MediaElementAudioSourceNode)

  The **`MediaElementAudioSourceNode`** interface represents an audio source consisting of an HTML [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) or [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) element. It is an [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode) that acts as an audio source. 该 `MediaElementAudioSourceNode` 接口表示由 HTML `<audio>` 或 `<video>` 元素组成的音频源。它是一种 `AudioNode` 充当音频源的信号源。

* [`MediaStreamAudioSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioSourceNode)

  The **`MediaStreamAudioSourceNode`** interface represents an audio source consisting of a [`MediaStream`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) (such as a webcam, microphone, or a stream being sent from a remote computer). If multiple audio tracks are present on the stream, the track whose [`id`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/id "id") comes first lexicographically (alphabetically) is used. It is an [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode) that acts as an audio source. 该 `MediaStreamAudioSourceNode` 接口表示由 `MediaStream` （例如网络摄像头、麦克风或从远程计算机发送的流）组成的音频源。如果流中存在多个音轨，则使用按字典（字母顺序） `id` 排在第一位的音轨。它是一种 `AudioNode` 充当音频源的信号源。

* [`MediaStreamTrackAudioSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrackAudioSourceNode)

  A node of type [`MediaStreamTrackAudioSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrackAudioSourceNode) represents an audio source whose data comes from a [`MediaStreamTrack`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack). When creating the node using the [`createMediaStreamTrackSource()`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamTrackSource "createMediaStreamTrackSource()") method to create the node, you specify which track to use. This provides more control than `MediaStreamAudioSourceNode`. 类型的 `MediaStreamTrackAudioSourceNode` 节点表示其数据来自 `MediaStreamTrack` 的音频源。使用创建节点 `createMediaStreamTrackSource()` 的方法创建节点时，您可以指定要使用的轨道。这提供了比 `MediaStreamAudioSourceNode` 更多的控制。

### [Defining audio effects filters 定义音频效果过滤器](#defining_audio_effects_filters)

Interfaces for defining effects that you want to apply to your audio sources. 用于定义要应用于音频源的效果的接口。

* [`BiquadFilterNode`](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode)

  The **`BiquadFilterNode`** interface represents a simple low-order filter. It is an [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode) that can represent different kinds of filters, tone control devices, or graphic equalizers. A `BiquadFilterNode` always has exactly one input and one output. 该 `BiquadFilterNode` 接口表示一个简单的低阶滤波器。 `AudioNode` 它可以表示不同类型的滤波器、音调控制设备或图形均衡器。A `BiquadFilterNode` 始终只有一个输入和一个输出。

* [`ConvolverNode`](https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode)

  The **`ConvolverNode`** interface is an [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode) that performs a Linear Convolution on a given [`AudioBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer), and is often used to achieve a reverb effect. 该 `ConvolverNode` 接口是在 `AudioNode` 给定 `AudioBuffer` 的接口上执行线性卷积，通常用于实现混响效果。

* [`DelayNode`](https://developer.mozilla.org/en-US/docs/Web/API/DelayNode)

  The **`DelayNode`** interface represents a [delay-line](https://en.wikipedia.org/wiki/Digital_delay_line); an [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode) audio-processing module that causes a delay between the arrival of an input data and its propagation to the output. 该 `DelayNode` 接口表示延迟线；音频 `AudioNode` 处理模块，在输入数据到达和传播到输出之间产生延迟。

* [`DynamicsCompressorNode`](https://developer.mozilla.org/en-US/docs/Web/API/DynamicsCompressorNode)

  The **`DynamicsCompressorNode`** interface provides a compression effect, which lowers the volume of the loudest parts of the signal in order to help prevent clipping and distortion that can occur when multiple sounds are played and multiplexed together at once. 该 `DynamicsCompressorNode` 接口提供压缩效果，可降低信号最响亮部分的音量，以帮助防止在同时播放和多路复用多个声音时可能发生的削波和失真。

* [`GainNode`](https://developer.mozilla.org/en-US/docs/Web/API/GainNode)

  The **`GainNode`** interface represents a change in volume. It is an [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode) audio-processing module that causes a given *gain* to be applied to the input data before its propagation to the output. 该 `GainNode` 接口表示音量的变化。它是一个 `AudioNode` 音频处理模块，在将给定增益传播到输出之前将其应用于输入数据。

* [`WaveShaperNode`](https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode)

  The **`WaveShaperNode`** interface represents a non-linear distorter. It is an [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode) that use a curve to apply a waveshaping distortion to the signal. Beside obvious distortion effects, it is often used to add a warm feeling to the signal. 该 `WaveShaperNode` 接口表示非线性失真器。它使用 `AudioNode` 曲线对信号施加波形整形失真。除了明显的失真效果外，它通常用于为信号增加温暖的感觉。

* [`PeriodicWave`](https://developer.mozilla.org/en-US/docs/Web/API/PeriodicWave)

  Describes a periodic waveform that can be used to shape the output of an [`OscillatorNode`](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode). 描述可用于调整 输出的周期性波形 `OscillatorNode` 。

* [`IIRFilterNode`](https://developer.mozilla.org/en-US/docs/Web/API/IIRFilterNode)

  Implements a general [infinite impulse response](https://en.wikipedia.org/wiki/Infinite_impulse_response) (IIR) filter; this type of filter can be used to implement tone-control devices and graphic equalizers as well. 实现通用无限脉冲响应 （IIR） 滤波器；这种类型的滤波器也可用于实现音调控制设备和图形均衡器。

### [Defining audio destinations 定义音频目标](#defining_audio_destinations)

Once you are done processing your audio, these interfaces define where to output it. 处理完音频后，这些接口将定义输出音频的位置。

* [`AudioDestinationNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioDestinationNode)

  The **`AudioDestinationNode`** interface represents the end destination of an audio source in a given context — usually the speakers of your device. 该 `AudioDestinationNode` 接口表示给定上下文中音频源的最终目标，通常是设备的扬声器。

* [`MediaStreamAudioDestinationNode`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioDestinationNode)

  The **`MediaStreamAudioDestinationNode`** interface represents an audio destination consisting of a [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) [`MediaStream`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) with a single `AudioMediaStreamTrack`, which can be used in a similar way to a [`MediaStream`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) obtained from [`getUserMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia "getUserMedia()"). It is an [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode) that acts as an audio destination. 该接口表示一个音频目标，该 `MediaStreamAudioDestinationNode` 目标由一个 WebRTC `MediaStream` 和一个 `AudioMediaStreamTrack` 组成，其使用方式与从 `MediaStream` `getUserMedia()` 获得 的方式类似。它充当 `AudioNode` 音频目的地。

### [Data analysis and visualization 数据分析和可视化](#data_analysis_and_visualization)

If you want to extract time, frequency, and other data from your audio, the `AnalyserNode` is what you need. 如果您想从音频中提取时间、频率和其他数据， `AnalyserNode` 这就是您所需要的。

* [`AnalyserNode`](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode)

  The **`AnalyserNode`** interface represents a node able to provide real-time frequency and time-domain analysis information, for the purposes of data analysis and visualization. 该 `AnalyserNode` 接口表示能够提供实时频域和时域分析信息的节点，用于数据分析和可视化。

### [Splitting and merging audio channels 拆分和合并音频通道](#splitting_and_merging_audio_channels)

To split and merge audio channels, you'll use these interfaces. 要拆分和合并音频通道，您将使用这些接口。

* [`ChannelSplitterNode`](https://developer.mozilla.org/en-US/docs/Web/API/ChannelSplitterNode)

  The **`ChannelSplitterNode`** interface separates the different channels of an audio source out into a set of *mono* outputs. 该 `ChannelSplitterNode` 接口将音频源的不同声道分离成一组单声道输出。

* [`ChannelMergerNode`](https://developer.mozilla.org/en-US/docs/Web/API/ChannelMergerNode)

  The **`ChannelMergerNode`** interface reunites different mono inputs into a single output. Each input will be used to fill a channel of the output. 该 `ChannelMergerNode` 接口将不同的单声道输入重新组合为单个输出。每个输入将用于填充输出的一个通道。

### [Audio spatialization 音频空间化](#audio_spatialization)

These interfaces allow you to add audio spatialization panning effects to your audio sources. 这些接口允许您向音频源添加音频空间化平移效果。

* [`AudioListener`](https://developer.mozilla.org/en-US/docs/Web/API/AudioListener)

  The **`AudioListener`** interface represents the position and orientation of the unique person listening to the audio scene used in audio spatialization. 该 `AudioListener` 接口表示收听音频空间化中使用的音频场景的唯一人员的位置和方向。

* [`PannerNode`](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode)

  The **`PannerNode`** interface represents the position and behavior of an audio source signal in 3D space, allowing you to create complex panning effects. 该 `PannerNode` 界面表示音频源信号在 3D 空间中的位置和行为，允许您创建复杂的声像效果。

* [`StereoPannerNode`](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode)

  The **`StereoPannerNode`** interface represents a simple stereo panner node that can be used to pan an audio stream left or right. 该 `StereoPannerNode` 接口表示一个简单的立体声声像器节点，可用于向左或向右平移音频流。

### [Audio processing in JavaScriptJavaScript 中的音频处理](#audio_processing_in_javascript)

Using audio worklets, you can define custom audio nodes written in JavaScript or [WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly). Audio worklets implement the [`Worklet`](https://developer.mozilla.org/en-US/docs/Web/API/Worklet) interface, a lightweight version of the [`Worker`](https://developer.mozilla.org/en-US/docs/Web/API/Worker) interface. 使用音频工作程序，您可以定义用 JavaScript 或 WebAssembly 编写的自定义音频节点。音频工作文件实现了接口， `Worklet` 这是 `Worker` 接口的轻量级版本。

* [`AudioWorklet`](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet)

  The `AudioWorklet` interface is available through the [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) object's [`audioWorklet`](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/audioWorklet "audioWorklet"), and lets you add modules to the audio worklet to be executed off the main thread. 该 `AudioWorklet` 接口可通过 `AudioContext` 对象的 `audioWorklet` 使用，并允许您将模块添加到音频工作程序中以在主线程上执行。

* [`AudioWorkletNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode)

  The `AudioWorkletNode` interface represents an [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode) that is embedded into an audio graph and can pass messages to the corresponding `AudioWorkletProcessor`. 该 `AudioWorkletNode` 接口表示 `AudioNode` 嵌入到音频图中，并且可以将消息传递给相应的 `AudioWorkletProcessor` .

* [`AudioWorkletProcessor`](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor)

  The `AudioWorkletProcessor` interface represents audio processing code running in a `AudioWorkletGlobalScope` that generates, processes, or analyzes audio directly, and can pass messages to the corresponding `AudioWorkletNode`. 该 `AudioWorkletProcessor` 接口表示在 a 中运行的音频处理代码， `AudioWorkletGlobalScope` 该代码直接生成、处理或分析音频，并且可以将消息传递给相应的 `AudioWorkletNode` .

* [`AudioWorkletGlobalScope`](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletGlobalScope)

  The `AudioWorkletGlobalScope` interface is a `WorkletGlobalScope`-derived object representing a worker context in which an audio processing script is run; it is designed to enable the generation, processing, and analysis of audio data directly using JavaScript in a worklet thread rather than on the main thread. 接口 `AudioWorkletGlobalScope` 是一个 `WorkletGlobalScope` 派生对象，表示运行音频处理脚本的工作器上下文；它旨在支持在工作线程中直接使用 JavaScript 而不是在主线程上生成、处理和分析音频数据。

#### Obsolete: script processor nodes 已过时：脚本处理器节点

Before audio worklets were defined, the Web Audio API used the `ScriptProcessorNode` for JavaScript-based audio processing. Because the code runs in the main thread, they have bad performance. The `ScriptProcessorNode` is kept for historic reasons but is marked as deprecated. 在定义音频工作程序之前，Web 音频 API 使用 用于 `ScriptProcessorNode` 基于 JavaScript 的音频处理。由于代码在主线程中运行，因此它们的性能很差。由于历史原因而保留， `ScriptProcessorNode` 但标记为已弃用。

* [`ScriptProcessorNode`](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode) Deprecated

  The **`ScriptProcessorNode`** interface allows the generation, processing, or analyzing of audio using JavaScript. It is an [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode) audio-processing module that is linked to two buffers, one containing the current input, one containing the output. An event, implementing the [`AudioProcessingEvent`](https://developer.mozilla.org/en-US/docs/Web/API/AudioProcessingEvent) interface, is sent to the object each time the input buffer contains new data, and the event handler terminates when it has filled the output buffer with data. 该 `ScriptProcessorNode` 接口允许使用 JavaScript 生成、处理或分析音频。它是一个 `AudioNode` 音频处理模块，链接到两个缓冲区，一个包含当前输入，一个包含输出。每当输入缓冲区包含新数据时，都会向对象发送一个实现接口 `AudioProcessingEvent` 的事件，并且事件处理程序在用数据填充输出缓冲区时终止。

* [`audioprocess`](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode/audioprocess_event "audioprocess") (event)   `audioprocess` （事件） Deprecated

  The `audioprocess` event is fired when an input buffer of a Web Audio API [`ScriptProcessorNode`](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode) is ready to be processed. 当 Web 音频 API `ScriptProcessorNode` 的输入缓冲区准备好进行处理时，将触发 `audioprocess` 该事件。

* [`AudioProcessingEvent`](https://developer.mozilla.org/en-US/docs/Web/API/AudioProcessingEvent) Deprecated

  The `AudioProcessingEvent` represents events that occur when a [`ScriptProcessorNode`](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode) input buffer is ready to be processed. 表示 `AudioProcessingEvent` `ScriptProcessorNode` 当输入缓冲区准备好进行处理时发生的事件。

### [Offline/background audio processing 离线 / 后台音频处理](#offlinebackground_audio_processing)

It is possible to process/render an audio graph very quickly in the background — rendering it to an [`AudioBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) rather than to the device's speakers — with the following. 可以通过以下方式在后台非常快速地处理 / 渲染音频图 - 将其渲染到 `AudioBuffer` 设备扬声器而不是设备的扬声器。

* [`OfflineAudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext)

  The **`OfflineAudioContext`** interface is an [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) interface representing an audio-processing graph built from linked together [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode)s. In contrast with a standard `AudioContext`, an `OfflineAudioContext` doesn't really render the audio but rather generates it, *as fast as it can*, in a buffer. 该 `OfflineAudioContext` 接口是一个接口， `AudioContext` 表示由链接在一起 `AudioNode` 构建的音频处理图。与标准 `AudioContext` 相比，an `OfflineAudioContext` 不会真正渲染音频，而是在缓冲区中尽可能快地生成音频。

* [`complete`](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext/complete_event "complete") (event)  `complete` （事件）

  The `complete` event is fired when the rendering of an [`OfflineAudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext) is terminated. 当 的 `OfflineAudioContext` 呈现终止时，将触发 `complete` 该事件。

* [`OfflineAudioCompletionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioCompletionEvent)

  The `OfflineAudioCompletionEvent` represents events that occur when the processing of an [`OfflineAudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext) is terminated. The [`complete`](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext/complete_event "complete") event uses this interface. 表示 `OfflineAudioCompletionEvent` 终止处理 `OfflineAudioContext` 时发生的事件。该 `complete` 事件使用此接口。

## [Guides and tutorials 指南和教程](#guides_and_tutorials)

* [Advanced techniques: Creating and sequencing audio 高级技术：创建音频并对其进行排序](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques)

  In this tutorial, we're going to cover sound creation and modification, as well as timing and scheduling. We will introduce sample loading, envelopes, filters, wavetables, and frequency modulation. If you're familiar with these terms and looking for an introduction to their application with the Web Audio API, you've come to the right place. 在本教程中，我们将介绍声音的创建和修改，以及时间和调度。我们将介绍样本加载、包络、滤波器、波表和频率调制。如果您熟悉这些术语，并希望了解其使用 Web Audio API 的应用程序，那么您来对地方了。

* [Background audio processing using AudioWorklet 使用 AudioWorklet 进行后台音频处理](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_AudioWorklet)

  This article explains how to create an audio worklet processor and use it in a Web Audio application. 本文介绍如何创建音频工作程序处理器并在 Web 音频应用程序中使用它。

* [Basic concepts behind Web Audio APIWeb Audio API 背后的基本概念](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API)

  This article explains some of the audio theory behind how the features of the Web Audio API work to help you make informed decisions while designing how your app routes audio. If you are not already a sound engineer, it will give you enough background to understand why the Web Audio API works as it does. 本文介绍了 Web 音频 API 的功能如何帮助您在设计应用路由音频的方式时做出明智的决策背后的一些音频理论。如果您还不是音响工程师，它将为您提供足够的背景知识来理解 Web Audio API 为什么会这样工作。

* [Controlling multiple parameters with ConstantSourceNode 使用 ConstantSourceNode 控制多个参数](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Controlling_multiple_parameters_with_ConstantSourceNode)

  This article demonstrates how to use a `ConstantSourceNode` to link multiple parameters together so they share the same value, which can be changed by setting the value of the `ConstantSourceNode.offset` parameter. 本文演示如何使用 将 `ConstantSourceNode` 多个参数链接在一起，以便它们共享相同的值，可以通过设置 `ConstantSourceNode.offset` 参数的值来更改该值。

* [Example and tutorial: Simple synth keyboard 示例和教程：简单合成器键盘](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Simple_synth)

  This article presents the code and working demo of a video keyboard you can play using the mouse. The keyboard allows you to switch among the standard waveforms as well as one custom waveform, and you can control the main gain using a volume slider beneath the keyboard. This example makes use of the following Web API interfaces: `AudioContext`, `OscillatorNode`, `PeriodicWave`, and `GainNode`. 本文介绍了您可以使用鼠标播放的视频键盘的代码和工作演示。键盘允许您在标准波形和一种自定义波形之间切换，并且您可以使用键盘下方的音量滑块控制主增益。此示例使用以下 Web API 接口： `AudioContext` 、 `OscillatorNode` 、 `PeriodicWave` 和 `GainNode` 。

* [Tools for analyzing Web Audio usage 用于分析 Web 音频使用情况的工具](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Tools)

  While working on your Web Audio API code, you may find that you need tools to analyze the graph of nodes you create or to otherwise debug your work. This article discusses tools available to help you do that. 在处理 Web 音频 API 代码时，您可能会发现需要工具来分析您创建的节点图或以其他方式调试您的工作。本文讨论可用于帮助您执行此操作的工具。

* [Using IIR filters 使用 IIR 滤波器](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_IIR_filters)

  The **`IIRFilterNode`** interface of the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) is an `AudioNode` processor that implements a general [infinite impulse response](https://en.wikipedia.org/wiki/Infinite_impulse_response) (IIR) filter; this type of filter can be used to implement tone control devices and graphic equalizers, and the filter response parameters can be specified, so that it can be tuned as needed. This article looks at how to implement one, and use it in a simple example.Web Audio API 的 `IIRFilterNode` 接口是实现通用无限脉冲响应 （IIR） 滤波器的 `AudioNode` 处理器；这种类型的滤波器可用于实现音调控制装置和图形均衡器，并且可以指定滤波器响应参数，以便根据需要进行调谐。本文着眼于如何实现一个，并在一个简单的示例中使用它。

* [Using the Web Audio API 使用 Web 音频 API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API)

  Let's take a look at getting started with the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). We'll briefly look at some concepts, then study a simple boombox example that allows us to load an audio track, play and pause it, and change its volume and stereo panning. 让我们看一下 Web Audio API 的入门。我们将简要介绍一些概念，然后研究一个简单的音箱示例，该示例允许我们加载音轨、播放和暂停它，并更改其音量和立体声声像。

* [Visualizations with Web Audio API 使用 Web Audio API 进行可视化](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API)

  One of the most interesting features of the Web Audio API is the ability to extract frequency, waveform, and other data from your audio source, which can then be used to create visualizations. This article explains how, and provides a couple of basic use cases.Web Audio API 最有趣的功能之一是能够从音频源中提取频率、波形和其他数据，然后可以使用这些数据创建可视化效果。本文将介绍操作方法，并提供一些基本用例。

* [Web Audio API best practicesWeb 音频 API 最佳做法](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices)

  There's no strict right or wrong way when writing creative code. As long as you consider security, performance, and accessibility, you can adapt to your own style. In this article, we'll share a number of *best practices* — guidelines, tips, and tricks for working with the Web Audio API. 在编写创意代码时，没有严格的对错之分。只要你考虑安全性、性能和可访问性，你就可以适应自己的风格。在本文中，我们将分享一些最佳实践，包括使用 Web 音频 API 的指南、提示和技巧。

* [Web audio spatialization basicsWeb 音频空间化基础知识](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics)

  As if its extensive variety of sound processing (and other) options wasn't enough, the Web Audio API also includes facilities to allow you to emulate the difference in sound as a listener moves around a sound source, for example panning as you move around a sound source inside a 3D game. The official term for this is **spatialization**, and this article will cover the basics of how to implement such a system. 似乎其种类繁多的声音处理（和其他）选项还不够，Web Audio API 还包括一些工具，允许您在听众在声源周围移动时模拟声音差异，例如在 3D 游戏中在声源周围移动时进行平移。这方面的官方术语是空间化，本文将介绍如何实现这样一个系统的基础知识。

## [Examples 例子](#examples)

You can find a number of examples at our [webaudio-example repo](https://github.com/mdn/webaudio-examples/) on GitHub. 您可以在 GitHub 上的 webaudio-example 存储库中找到许多示例。

## [Specifications 规格](#specifications)

| Specification 规范                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------- |
| [Web Audio API Web 音频 API<!-- --> # <!-- -->AudioContext # 音频上下文](https://webaudio.github.io/web-audio-api/#AudioContext) |

## [Browser compatibility 浏览器兼容性](#browser_compatibility)

### [AudioContext 音频上下文](#audiocontext_2)

[Report problems with this compatibility data on GitHub 在 GitHub 上报告此兼容性数据的问题](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWeb_Audio_API\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60api.AudioContext%60%0A*+Report+started%3A+2024-02-28T03%3A38%3A53.846Z%0A%0A%3C%2Fdetails%3E\&title=api.AudioContext+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|                                                                                                                                    | desktop  |         |            |          |                   | mobile                            |                                         |                        |                                 |                        |                            |
| ---------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ---------- | -------- | ----------------- | --------------------------------- | --------------------------------------- | ---------------------- | ------------------------------- | ---------------------- | -------------------------- |
|                                                                                                                                    | Chrome 铬 | Edge 边缘 | Firefox 火狐 | Opera 歌剧 | Safari Safari 浏览器 | Chrome Android Chrome 浏览器 Android | Firefox for Android Firefox 针对于 Android | Opera Android Opera 安卓 | Safari on iOS iOS 上的 Safari 浏览器 | Samsung Internet 三星互联网 | WebView Android WebView 安卓 |
| `AudioContext`                                                                                                                     |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |
| [`AudioContext()` constructor  `AudioContext()` 构造 函数](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext) |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |
| `options.latencyHint` parameter  `options.latencyHint` 参数                                                                          |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |
| `options.sampleRate` parameter  `options.sampleRate` 参数                                                                            |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |
| `options.sinkId` parameter  `options.sinkId` 参数Experimental                                                                        |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |
| [`baseLatency`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/baseLatency)                                         |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |
| [`close`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/close)                                                     |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |
| [`createMediaElementSource`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaElementSource)               |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |
| [`createMediaStreamDestination`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamDestination)       |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |
| [`createMediaStreamSource`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamSource)                 |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |
| [`createMediaStreamTrackSource`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamTrackSource)       |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |
| [`getOutputTimestamp`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/getOutputTimestamp)                           |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |
| [`outputLatency`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/outputLatency)                                     |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |
| [`resume`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/resume)                                                   |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |
| [`setSinkId`Experimental](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/setSinkId)                                 |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |
| [`sinkId`Experimental](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/sinkId)                                       |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |
| [`sinkchange` eventExperimental](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/sinkchange_event)                   |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |
| [`suspend`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/suspend)                                                 |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |

### Legend

Tip: you can click/tap on a cell for more information.

* * Full support
  * No support
  *
  *
  *
  *

  - Full support
  - No support
  - Experimental. Expect behavior to change in the future.
  - See implementation notes.
  - Requires a vendor prefix or different name for use.
  - Has more compatibility info.

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [See also](#see_also)

### [Tutorials/guides](#tutorialsguides)

### [Libraries](#libraries)

* [Tones](https://github.com/bit101/tones): a simple library for playing specific tones/notes using the Web Audio API.
* [Tone.js](https://tonejs.github.io/): a framework for creating interactive music in the browser.
* [howler.js](https://github.com/goldfire/howler.js/): a JS audio library that defaults to [Web Audio API](https://webaudio.github.io/web-audio-api/) and falls back to [HTML Audio](https://html.spec.whatwg.org/multipage/media.html#the-audio-element), as well as providing other useful features.
* [Mooog](https://github.com/mattlima/mooog): jQuery-style chaining of AudioNodes, mixer-style sends/returns, and more.
* [XSound](https://xsound.jp/): Web Audio API Library for Synthesizer, Effects, Visualization, Recording, etc.
* [OpenLang](https://github.com/chrisjohndigital/OpenLang): HTML video language lab web application using the Web Audio API to record and combine video and audio from different sources into a single file ([source on GitHub](https://github.com/chrisjohndigital/OpenLang))
* [Pts.js](https://ptsjs.org/): Simplifies web audio visualization ([guide](https://ptsjs.org/guide/sound-0800))
