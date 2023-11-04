import 'package:flutter/material.dart';
import 'package:jamie/widgets/top_bar.dart';
import 'package:jamie/widgets/web_scrollbar.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Jamie Stuart',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // TRY THIS: Try running your application with "flutter run". You'll see
        // the application has a blue toolbar. Then, without quitting the app,
        // try changing the seedColor in the colorScheme below to Colors.green
        // and then invoke "hot reload" (save your changes or press the "hot
        // reload" button in a Flutter-supported IDE, or press "r" if you used
        // the command line to start the app).
        //
        // Notice that the counter didn't reset back to zero; the application
        // state is not lost during the reload. To reset the state, use hot
        // restart instead.
        //
        // This works for code too, not just values: Most code changes can be
        // tested with just a hot reload.
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.black),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Jamie Stuart'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late ScrollController _scrollController;
  double _scrollPosition = 0;
  double _opacity = 0;

  _scrollListener() {
    setState(() {
      _scrollPosition = _scrollController.position.pixels;
    });
  }

  @override
  void initState() {
    _scrollController = ScrollController();
    _scrollController.addListener(_scrollListener);
    super.initState();
  }

  List<Widget> navItems = [
    InkWell(
      onTap: () {},
      child: Text(
        'Discover',
        style: TextStyle(color: Colors.black),
      ),
    ),
    ElevatedButton(onPressed: () {}, child: Text('Education')),
    ElevatedButton(onPressed: () {}, child: Text('Hey')),
  ];
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    var screenSize = MediaQuery.of(context).size;
    _opacity = _scrollPosition < screenSize.height * 0.40
        ? _scrollPosition / (screenSize.height * 0.40)
        : 1;
    final isWide = MediaQuery.of(context).size.width > 700;

    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: isWide
          ? PreferredSize(
              // for larger & medium screen sizes
              preferredSize: Size(screenSize.width, 1000),
              child: TopBar(_opacity),
            )
          : AppBar(
              actions: isWide ? navItems : [],
              // TRY THIS: Try changing the color here to a specific color (to
              // Colors.amber, perhaps?) and trigger a hot reload to see the AppBar
              // change color while the other colors stay the same.
              backgroundColor: Theme.of(context).colorScheme.inversePrimary,
              // Here we take the value from the MyHomePage object that was created by
              // the App.build method, and use it to set our appbar title.
              title: Text(widget.title),
            ),
      drawer: isWide ? null : ListView(children: navItems),
      body: WebScrollbar(
        color: Colors.blueGrey,
        backgroundColor: Colors.blueGrey.withOpacity(0.3),
        width: 10,
        heightFraction: 0.3,
        controller: _scrollController,
        child: SingleChildScrollView(
          controller: _scrollController,
          physics: ClampingScrollPhysics(),
          child: Column(
            children: [
              Stack(alignment: Alignment.center, children: [
                Container(
                  child: SizedBox(
                    height: screenSize.height * 0.45,
                    width: screenSize.width,
                    child: Image.asset(
                      'assets/images/headshot.png',
                      // 'https://firebasestorage.googleapis.com/v0/b/whatsthemoov-app.appspot.com/o/do-not-delete%2Fvideo_preview.png?alt=media&token=54976899-a3dc-460e-9c1f-1825bbee8bac&_gl=1*1h2vnsn*_ga*OTI2NzE2OTguMTY4MDE5ODE0MA..*_ga_CW55HF8NVT*MTY5OTA5NjE3Ny40MTMuMS4xNjk5MDk2NzkxLjM5LjAuMA..',
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(right: 200),
                  child: Text(
                    'UP YOUR GAME',
                    style: TextStyle(
                      color: Colors.blueGrey[100],
                      fontSize: 26,
                      fontFamily: 'Montserrat',
                      fontWeight: FontWeight.w400,
                      letterSpacing: 3,
                    ),
                  ),
                ),
              ]),
              const SizedBox(height: 50),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 50),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Column(
                      children: [
                        Image.asset(
                          'assets/images/emmy.png',
                          height: 80,
                        ),
                        const SizedBox(height: 17),
                        Text(
                          '6x Emmy Winner',
                          style: TextStyle(fontWeight: FontWeight.bold),
                        )
                      ],
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 50),
                      child: Column(
                        children: [
                          Image.asset(
                            'assets/images/newsday.png',
                          ),
                          Text(
                            'Newsday Sports',
                            style: TextStyle(fontWeight: FontWeight.bold),
                          )
                        ],
                      ),
                    ),
                    if (isWide) 
                    Column(
                      children: [
                        const SizedBox(height: 24),
                        Image.asset(
                          'assets/images/news12.png',
                        ),
                        const SizedBox(height: 30),
                        Text(
                          'News 12',
                          style: TextStyle(fontWeight: FontWeight.bold),
                        )
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 50),
              Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 100),
                    child: Text(
                      'Nothing In Business Is More Vital Than Communication.',
                      textAlign: TextAlign.center,
                      style:
                          TextStyle(fontSize: 30, fontWeight: FontWeight.w700),
                    ),
                  ),
                  const SizedBox(height: 50),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 100),
                    child: Text(
                      '''How you communicate – with a potential client via email, on your company’s daily zoom meeting, in your pitch at the C-suite level boardroom, or at the annual industry conference in front of 2,000 people – can make or break you as an individual and your company at-large.'''
                      '''\n\nBut being dynamic when you speak – clear, concise and compelling – isn’t easy, especially if there’s a bright light (or six) shining in your eyes.'''
                      '''\n\nWith 25 years of TV experience as an anchor at the network and local levels, I have the inside scoop to help. I have broadcast live in front of millions of people, covering everything from Wall Street to the Super Bowl to politics, bio-tech and more.
'''
                      '''\nI know what it takes to perform under pressure, and I’ll give you the secrets – how to get over stage fright, what to do with your hands, when to take a breath, and countless more tips – to help you connect with your audience and finally reach your true potential. From media training to speech writing to executive presence, let me help elevate your game.''' // FloatingQuickAccessBar(screenSize: screenSize),
                      ,
                      style: TextStyle(fontSize: 20),
                    ),
                  ), // Container(
                  //   child: Column(
                  //     children: [
                  //       FeaturedHeading(
                  //         screenSize: screenSize,
                  //       ),
                  //       FeaturedTiles(screenSize: screenSize)
                  //     ],
                  //   ),
                  // ),
                ],
              )
            ],
          ),
          // DestinationHeading(screenSize: screenSize),
          // DestinationCarousel(),
          // SizedBox(height: screenSize.height / 10),
          // BottomBar(),
        ),
      ),

      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
