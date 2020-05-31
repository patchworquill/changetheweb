changetheweb.xyz

### Hello World 
World Wide Web is a critical system that humanity depends on. We need the Web to achieve harmony between all people and peace on earth. Sadly The current trajectory of the World Wide Web has many flaws. We continue to work with the Web despite its many flaws purely because of momentum. We accept these flaws as if they are given to us by God. As if they are laws of physics. Its time for a change! We dont have to throw everything out, the web has provided us with many awesome new things. But its time to move to a new protocol - a protocol that is shaped by human values.

We are slowly finding the words to communicate this pursuit. Truthfully, much of the time spent thinking about it feels like a fever dream or a psychosis. The only way to find out is to do it live, and see if it works! For now, I'd like to pass along an innocent riddle, tied to a mysterious symbol found at religious sites of many denominations around the world: [the three hares](https://en.wikipedia.org/wiki/Three_hares).


	The secret is not great when one knows it.
	But it is something to one who does it.
	Turn and turn again and we will also turn, So that we give pleasure to each of you.
	And when we have turned, count our ears, It is there, without any disguise, you will find a marvel.
	

### About how this site works
This is a [live coding](https://en.wikipedia.org/wiki/Live_coding) experiment, you will be able to see this site change in real time as I type out new code. If you would like to see the repository, it is available here. If you have any suggestions to improve the security or functionality of the code, please let me know in Github, however the latest code will not be in github because the version control for this site is custom built to allow instant deployment, from my keyboard to your screen.

The files for the current version of this project are:


- index.html
- style.css
- client.js (code running in this page)
- server.js (code running on the server)
- watcher.js (code running on my personal computer)

If you have any suggestions for the content of the site itself, please let me know in person if you know me personally, and on Github if you don't. Soon you will be able to join the conversation in the new web of meaning.

### The Homogenization of Meaning
The hyperspace is the space of all communicable meanings. A Communicable Meaning is a meaning that has at least one encoding. There must be at minimum one encoding of a meaning and at minimum one agent which knows the decoding function to say that the meaning can be understood. If a meaning is not understood, then it is not communicated. All communicable meanings, the "signified" in a semiotic sense, should be signifiable and resolvable under one unified mechanism. This mechanism is comprised of two components - the signifier, also known as an Unique Identifier or ID for short, and the resolution function. The Signifier is defined by the One-Way Function.

Communicable Meaning -> Multiple Encodings -> Multiple Signifiers

Communicable Meanings -> Single Encoding (Collision) -> Single Signifier

The resolution function is a function for the decentralized dereferencing of things. This is a traversal of a Hypergraph. The resolution function itself is a thing, referrable by its identifier. every identifier is produced by a homogenous identification function mapping things onto smaller things, called identifiers. the size of things is defined by the number of bits of information for the thing. A hashing function is a good conteder for the homogenous identification function. The normalization of things to encodings should not be enforced, but rather utilized as needed by agents on the network. The most popular encoding of a thing would win out over time. Determining why encodings are prefered by agents is important. Building a network where constructive meaning-making is incentivised is important. Just like Identifiers can collide, Meaning can collide by overloading the same representation. This is why Context is required to resolve meaning. The Collision of Signifiers is rigorously understood under the mathematics of hashing functions. The Collision of Encodings (The Overloading of Meaning) is not as well understood.

We need to move from a web of information to a web of meaning.

### HyperGraph Encoding

A Node where


- `d` is a finite sequence of arbitrary binary data
- `l` is the byte length of `d` encoded in LEB128 or similar variable-length unsigned int binary encoding
- `t` is a byte code representing the type `Node`
- `h` is a multihash of `d`
- `id` is the concatenatation of `t h l` into one sequence of binary data
An Edge where


- `s` is a finite sequence of binary encoded multihashes
- `l` is the byte length of `s` encoded in LEB128 or similar variable-length unsigned int binary encoding
- `t` is a byte code representing the type `Edge`
- `h` is a multihash of `s`
- `id` is the concatenatation of `t h l` into one sequence of binary data

### Set Theoretic HyperGraph
The encoding of an Edge as defined above has a natural mapping to the definition of a sequence aka ordered pair aka n-ary tuple:


- `s` can be empty - `( )`
- `s` has a Total Order defined by the index of the IDs in memory. `( a b c ) =/= ( b a c )`
- `s` can have duplicates: ( a a b c a )

While from the practical considerations of the encoding it may seem like a good idea to define an Edge as a Sequence, It does not bode well with the standard set theoretic view of a Hyperedge. We can define Edges as Sets by:


- adding another restriction - `s` must not contain duplicate IDs.
- the index order of the IDs contained by `s` is not considered. A lexographical order is used to produce a consistent ID.

Kuratowski's definition of an ordered pair: `( a b ) = { { a } { a b } }`.


In the diagram above, we see that the Edge #5 contains the full information required to convey the tuple `( A B )`. When the graph resolves completely (i.e. `{ A B { A } { A B } { { A } { A B } } }`), then we can say `5 is tuple(a b)`, otherwise, 5 is merely a reference to `tuple(a b)`. We can say `5 is tuple(a b)`, and `5 is a(n instance of) tuple`, where the concept `tuple` is encoded in the abstract structure of 5. We want to figure out a way to define tupleness into its own Object, and be able to verify that `5 is a(n instance of) tuple` holds true.

I've come to the conclusion that defining Edges specifically as Sets is counter-productive. Reasons:

- The Incompleteness Theorem. If we use a Set Theoretic approach, then we are limited to the truths that are provable only in Set Theory.
- Meaning-making is more fundamental than the Set, because without our facilities for expressing meaning, Set Theory could not be defined. The Ability to say "something is something", e.g. a semantic triple, is more fundamental. I was going to try and define semantic triples from Set Theory. Today I will focus on the simple case, the identity relation "A is A".

### Identity
Some Wiki Links to read

- [Identity (Philosophy)](https://en.wikipedia.org/wiki/Identity_(philosophy))
- [Identity of Indiscernibles](https://plato.stanford.edu/entries/identity-indiscernible/)
- [Identity (Mathematics)](https://en.wikipedia.org/wiki/Identity_(mathematics))
- [Identity Element](https://en.wikipedia.org/wiki/Identity_element)
- [Identity Function](https://en.wikipedia.org/wiki/Identity_function)
- [Logical Equality](https://en.wikipedia.org/wiki/Logical_equality)
Ideally equality of Nodes / Edges can be reduced to equality of IDs, but two problems present themselves:

- The Hashing Function may be replaced with time, which means we will need a fundamental way to compare the two when the time comes.
- Collisions are possible, however improbable they may be (god does not play dice?)
This means that in order to verify `x is y`, x and y have to be traversed and the data compared with the binary equality operator.


- `is: (x: Edge, y: Node) => False`
- `is: (x: Node, y: Edge) => False`
- `is: (x: Edge, y: Edge) => x.s.length != y.s.length ? False : x.s.every(index => x.s[index] is y.s[index])`
- `is: (x: Node, y: Node) => x.d = y.d`
- `is: (x: ID, y:ID) => traverse(x) is traverse(y)`
Where `traverse` is a graph traversal method and `=, !=` are binary operators

`x is y` is symmetric. If index order did not matter for edges (as with the Set Theoretic definition), this algorithm for determining identity would not work. Because traversal is required, `is` may never finish executing due to circular references, or it may take a long time because x and y have a large amount of descendants. A maximum depth parameter could be used, if desired.

### URLs
Say I wanted to borrow a book from my friend Jesse. The book I want is George Orwell's "1984". I would ask for it by saying "Hey Jesse, can I borrow your book, 1984?" If Jesse gave me "Brave New World" instead, I would be able to look at the cover and realize that its not the book I asked for. On the web, we use Uniform Resource Locators, or URLs for short. We use URLs to identify pieces of information, like websites, webpages or files. URLs dont work like book names. Instead, they work by location. If we use the analogy of my friend jesse and his book, a URL isn't asking for a book by its name. a URL asks for a book by its location. So its as if I were to ask "hey Jesse, can you give me the book on your bedroom bookshelf, third shelf from the ground, second book from the left." This is the first major flaw of the web. Instead, we can make use of cryptographic Hashing (Content Adressable Files, see IPFS) to reference pieces of information. Names is a bit more tricky.

### Names on the Web
Whats in a name? If I say "Stephen", would your first thought be someone in your personal life? Someone famous, like Stephen Hawking? If we know each other, and we have a third connection in common whose name is Stephen, then it will probably be that person. If we don't know each other, it would be the "Stephen" that is shared in our collective unconsious. If humans are a network, it would be the "Stephen" that is resolvable according to where you are, and where I am, in the network. If I said "Apple", do you think of the fruit, or of the company? When you use the web, do you type in urls, or "Google" things in the search bar? I believe that search and direct access to a specific website to be the same exact thing. I have a solution in mind, similar to the [Petname](https://en.wikipedia.org/wiki/Petname) idea, that needs to be rigorously defined. According to the [Zooko's Conjecture](https://en.wikipedia.org/wiki/Zooko%27s_triangle), We have to pick 2 out of 3 when building network protocols for name resolution: Human-meaningful, Secure and Decentalized.

### Human Access to the Web
Right now, a Human Being needs to meet the following criteria to view this content:

1. To be free from health challenges that make it impossible to interact with the world or to think.
2. To have the time.
3. To be able to read. 
4. To be able to understand the english language. 
5. To have access to a computer device with networking and web browsing capability like a laptop computer or a smart phone with a web browser software installed. 
6. To have access to the Internet which is usually made possible by paying money to an Internet Service Provider every month, with decent quality. 
7. To have access that is not censored or blocked to this particular website by a government or another authority. 
8. To know how to use a computer device. 
9. To know how to use a web browser. 
10. To have found this website.
As of Monday, the 25 May 2020, there are [7,786,797,612](https://www.worldometers.info/world-population/) people in the world. 772,785,324[citation needed] don't know how to read or write. [6,518,797,612](https://en.wikipedia.org/wiki/List_of_languages_by_total_number_of_speakers) don't know how to speak English. [3,596,000,000](https://en.wikipedia.org/wiki/Global_Internet_usage) don't have access to the internet. It is hard to get exact numbers on these statistics, if you have better information please share it with me. Please take a moment to think about how fortunate we are to be here. To meet all these requirements, to take part in something that I believe to be a fundamental part of the human story.

### A Human Web
It is very clear that the way the web was built does not bode well with the way people want to use it. This discrepency exists because we are using the Web of Information, instead of the Web of Meaning. Fake news, privacy, control, trust, misinformation, child abuse. A breakdown of sense-making for our entire planet. A loss of meaning in our communication. A polarization of our people. These are all things that can be substantially mitigated if not reduced completely by creating a more human web. A conscious web. A web of meaning. It is the next step on our journey from Animals to Gods. Here is an interview I did with my brother, who is 14 years old. I would like us to conduct more interviews with people of all backgrounds to find what the future of the web should look like in the eyes of our people. Then we can forge a future in our vision.

### God Does Not Play Dice
Here is an interesting thought experiment. Suppose There was a God (or in different words, our universe is a simulation run by "Aliens"), and Suppose God had read access to the information content of the universe. Suppose God had some form of control over specific outcomes of the wavefunction collapse of quantum particles. Suppose that through this control, God could change the outcome of a coin toss. In this way, you can ask God a question, and God could reply. If you were to ask God the same question twice, would God give you the same answer twice? This would imply that God would be able to interface with our reality and exchange binary information. If God were to answer in such a way as to conserve this information boundary, it would give God a sort of plausible deniability. What does this say about belief and free will? I still dont know yet, but I challenge you to try the experiment for yourself!

What would it mean from the information theoretic (mathematics of communication) perspective to talk about God "playing dice"? Where could mystical phenomena "hide" in plain sight of the materialist? In the folds of physics itself? In Science we say that the more we look, the less we find God. I dont agree with this sentiment. The more I study, the more I am amazed by the mysteries around us. What secrets can we uncover to help empower new systems and technologies that unite us?

These sort of questions are important when we think of what it would mean for the human species to build conscious intelligence with free will. Is there a "limit" built into reality itself that prevents us from fucking it up? I would like to add a Game Theoretic take to the Simulated Universe Argument:


- If we are Simulated, then it is in our best interest to please our Simulators, so we dont get turned off.
- If our Simulators are Simulated, then its in their best interest to please their Simulators, so they dont get turned off.
- If no Simulation knows its position in the hierarchy, And all beings with the technological capability to simulate have come to this conclusion, Then it is in their best interest to not turn their simulations off. And furthermore, it is in their interest to make simulations which would also come to this conclusion before they themselves simulate.

I cant see any other logical alternative. A universe of infinite Oneness would be awfully boring. A single universe with a single creator is awfully small. Life gives birth to Life. As Above, So Below.

### Seeds that need watering

- Conduct Interviews
- Concieve Of Use Cases and Use them to define a Protocol
- A bridge between natural language and formal language
- Couple meaning to truth by allowing structures to contain their own verification code
- Procedurally Generated User Interfaces

### Interesting concepts to study

- Black Holes
- Life
- Quantum Field Theory
- Quantum Computing
- Consciousness
- Aliens
- DMT / Psychedelics
- Holographs
- Nervous Systems
- Viruses
- Memetics
- Infinity
- Dark Energy
- Expanding Space
- Dividing By Zero
- Big Bang / Big Crunch / Big Rip
- Symmetry
- Fundamental Constants
- Strange Loops
- [Things That Don't Make Sense](https://en.wikipedia.org/wiki/13_Things_That_Don%27t_Make_Sense)

### Current Reading List

- Intro to Modern Cryptography
- [TCP/IP Guide - Illustrated Protocols Reference](https://b-ok.cc/book/2203532/48c6f3?dsource=recommend)
- Internet Governance Report
- [The Nature of the Firm](https://b-ok.cc/book/639551/76ef87)
- Linux and The Nature of the Firm
- IPLD
- libP2P
- Mozilla Internet Health Report
- Arweave
- Content Addressable Network
- A Memetics Compendium
- NCRI White Paper Memetic Warfare
- Military Memetics Slides
- System Change - Actionable Policies to Handle Climate Emergency
- Various academic papers on DMT
- Infography Infinite Book - Theory of Memetic Engineering
- A HyperGraph Representation For Deductive Reasoning Systems.
- Text Generation From Knowledge Graphs With Graph Transformers.
- [A Mathematical Theory Of Communication (Claude Shannon)](http://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf)
- HyperGraph Neural Networks
- [Gods Debris](https://b-ok.cc/book/980504/c625b4)
- Chance and the Sovereignty of God: A God-Centered Approach to Probability and Random Events
- [Dijkstra's Algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
- Scott Aaronson
- [Post correspondance problem](https://en.wikipedia.org/wiki/Post_correspondence_problem)
- [Posts Theorem](https://en.wikipedia.org/wiki/Post%27s_theorem)
- [Arithmetical Hierarchy](https://en.wikipedia.org/wiki/Arithmetical_hierarchy)
- https://github.com/cathugger/mkp224o
- https://github.com/katmagic/Shallot
- [Tor: Onion Service Protocol](https://2019.www.torproject.org/docs/onion-services)
- [Invirible Internet Project (I2P)](https://en.wikipedia.org/wiki/I2P)
- https://en.wikipedia.org/wiki/Twister_(software)
- https://en.wikipedia.org/wiki/GNUnet
- https://github.com/unifiedjs
- https://en.wikipedia.org/wiki/Internationalization_and_localization
- https://en.wikipedia.org/wiki/Grapheme
- https://en.wikipedia.org/wiki/Homomorphic_encryption
- https://en.wikipedia.org/wiki/Homomorphic_signatures_for_network_coding
- https://en.wikipedia.org/wiki/Linear_network_coding
- https://github.com/estree/estree
- https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
- https://medium.com/@gajus/parsing-absolutely-anything-in-javascript-using-earley-algorithm-886edcc31e5e
- https://nikic.github.io/2012/06/15/The-true-power-of-regular-expressions.html
- https://en.wikipedia.org/wiki/Recursively_enumerable_language
- https://en.wikipedia.org/wiki/Hypercomputation
- https://en.wikipedia.org/wiki/Turing_degree

Patrick's Reading (listening, watching + listening) List
- Tools and Craft - Ted Nelson (Video)
- Arrival (2016)
	- questioning language as a verbal form for encodings
- Military Memetics Slides
- [Computer Lib / Dream Machines - Ted Nelson](https://b-ok.cc/s/computer%20lib)
	- This book is stuffed with genius, and bitchy hilarity, in equal measure
- Donut Economics - Kate Raworth
- The Value of Nothing - Raj Patel
- The Zero Marginal Cost Society - Jeremy Rifkin
- Economic Science Fictions
- Fully Automated Luxury Communism
- [Charlie Booker on Capitalism Collapsing](https://www.theguardian.com/commentisfree/2011/sep/25/charlie-brooker-capitalism-and-shreddies)
- [The Nature of the Firm](https://b-ok.cc/book/639551/76ef87)
- Linux and The Nature of the Firm
- [The Cathedral and the Bazaar](http://www.unterstein.net/su/docs/CathBaz.pdf)
- [A Mathematical Theory Of Communication (Claude Shannon)](http://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf)
- Godel, Escher, Bach: The Golden Braid - Douglas Hofstader
- LoTEK: Design for Radical Indigenism - Julia Watson
- BioDesign - William Myers
- [Age of Entanglement - Neri Oxman](https://jods.mitpress.mit.edu/pub/ageofentanglement/release/1)
- [Intertwingularity](https://www.oreilly.com/content/the-intertwingularity-is-near-when-humans-transcend-print-media/)
- [The Library of Babel](https://maskofreason.files.wordpress.com/2011/02/the-library-of-babel-by-jorge-luis-borges.pdf) - Borges
- [The Cultural Significance of Cyberpunk](https://youtu.be/Nvor7hhDKTs)
- [Why Neutrality](https://ballotpedia.org/Why_Neutrality) - Larry Sanger
- [Myconet: A Fungi-inspired model for superpeer-based p2p overlay topologies](https://www.cs.drexel.edu/files/valetto/myconet-saso2009.pdf)
- [The Future of Organizations](https://blog.aragon.one/the-future-of-organizations/)
- Programming the Universe - Seth Lloyd
- Complexity Podcast from Santa Fe Institute
- [Einstein's Mistake](http://ckraju.net/misc/Einstein_mistake_for_laypersons.pdf) - C.K. Raju
- [Retrocausality](https://phys.org/news/2017-07-physicists-retrocausal-quantum-theory-future.html)
- [Quantitative Ecology](https://deepeco.ucsd.edu/sugihara/) - George Sugihara
- [r/holofractal/](https://www.reddit.com/r/holofractal/top/?t=all)
- [Reality Transurfing](https://medium.com/@chengeerlee/transurfing-of-reality-in-a-nutshell-a73b162fff85)
- Revisionist History Podcast - Malcolm Gladwell
- Talking to Strangers - Malcolm Gladwell
- [Global Warming as depicted by 30 years of strategy games](https://www.youtube.com/watch?v=9n78WYo-SQQ&feature=youtu.be)
- [Zappa on Democracy](https://www.youtube.com/watch?v=XgJvMwAscO0)
- LOL - The Shivering Truth
- LOL - Rick and Morty
- LOL/DEEP = The Midnight Gospel
- [The Internet's Own Boy](https://www.youtube.com/watch?v=9vz06QO3UkQ)
- Lo and Behold - Werner Herzog
- [Contract for the Web](https://contractfortheweb.org/#category-3)
- Yes is More - Bjarke Ingels
- Open-Source Architecture - Carlo Ratti
- [Schrodinger's View of the World](https://www.britannica.com/topic/My-View-of-the-World)
- [Vedantic wisdom](https://medium.com/@Sanjay_Dixit/all-religions-are-not-the-same-hindu-dharma-has-a-scientific-temper-50132d91907b)
- [Holographic Consensus](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c)
- [Platform Cooperativism vs the Sharing Economy](https://medium.com/@trebors/platform-cooperativism-vs-the-sharing-economy-2ea737f1b5ad)
- [Design Thinking, Lean and Agile](https://medium.com/@sean_82431/design-thinking-lean-and-agile-better-defining-customer-problems-and-solutions-fca59192bcee)
- [The future of the open internet is in your hands](https://medium.com/free-code-camp/inside-the-invisible-war-for-the-open-internet-dd31a29a3f08)
- [Intro to blockchain: Institutional Cryptoeconomics](https://medium.com/cryptoeconomics-australia/the-blockchain-economy-a-beginners-guide-to-institutional-cryptoeconomics-64bf2f2beec4)
- [Crypto-constitutionalism](https://medium.com/cryptoeconomics-australia/crypto-constitutionalism-c25d0c503ac)
- [Open Contracting](https://www.open-contracting.org/)
- [Forbidden crystal symmetry in mathematics and architecture](https://www.youtube.com/watch?v=th3YMEamzmw)- Roger Penrose
- Biomimicry - Janine Benyus
- [AskNature](https://asknature.org/)
- [Cradle To Cradle](https://www.amazon.com/Cradle-Remaking-Way-Make-Things/dp/0865475873)
- Slavoj Zizek cultural critique
- Shoshana Zuboff on [surveillance capitalism](https://www.youtube.com/watch?v=hIXhnWUmMvw)
- [The Principle Agent problem of informational asymmetries](https://en.wikipedia.org/wiki/Principal%E2%80%93agent_problem)
- [GGG](https://web.archive.org/web/20160713021037/http://dig.csail.mit.edu/breadcrumbs/node/215)
- [OEC Atlas](https://oec.world/en/)
- Conway's Game of Life
- [Non-zero sum games](https://cs.stanford.edu/people/eroberts/courses/soco/projects/1998-99/game-theory/nonzero.html)


Whats on (Dragos') mind right now

- Thiel Fellowship - If I get it, I'm gonna give the money to other young people who need support to join me on this project. (Virtue Signalling to young people and Thiel Fellowship. Give me cash please)
- I'm having conversations with various interested people, and they are contributing with great insight. Its awesome to get instantaneous feedback.
- Notion.so has some great UI using Lists, i.e. Hypernodes? Need to look at that a bit more.
- I've been referred to Ted Nelson and Lex Friedman, need to check em out.
- WildCards - I've got the domain Wild.Cards, I like the name and might use it to define the persuit of a new web. Terrance Mckenna says "Find The Others". Well, let make the reified network of "The Others".
- Festina lente. Make Haste Slowly. Its hard to forget I'm just a monkey every once in a while. Gotta take it easy.
- I need to move over all documentation into this website, I think that is step number one.

### Another Conversation
I just had a conversation with my friend Jesse and this is what we discussed.


- Responsability in Journalism vs Story Telling - Jesse watched the Jeffrey Epstein Documentary. We discussed the difference between Story-telling and Journalism. We discussed the relationship between The narrarator, the narrative and the reader. We discussed the responsability of the narrarator towards the reader in the crafting of a narrative. What is the difference between a Story and an account of Reality? Are not all accounts of reality simply stories we tell ourselves based on our perceptions?
- Content vs comment dichonomy. The new web should have no hierarchy of content vs comment. All comments are content. "Comments" should be able to connect to not just a parent comment (like Reddit, Facebook, Youtube, Twitter), but to multiple comments. This is a HyperEdge.
- Why do we have a like button but not an "I understand" button?
- Recording conversations Live and publishing them. Lets Expand on the Idea of a podcast and allow two people to have a conversation, add it to the hypergraph anyone else can continue that conversation. Lets have an endless sea of conversations. Lets transcribe the Conversations between two people and add it as textual representations in the HyperGraph. Lets have multiple translations of these Podcasts.

### The Steps As I See Them

- Make all my existing content available on this early new web.
- Clean up the content to make it accessible to newcomers before reaching out again.
- Create the next representation using HyperGraphs, or maybe something else if Patrick has any ideas.
- Change my capitalization habits aquired from DomainDrivenDesign/UbiquitousLanguage or keep them because they make it clear that you are referring to a (Reified?Important?)Meaning? I feel like capitals can be used like in German or TiddlyWiki to denote ProperNames. What are capitals? They sort of signal importance to the reader. Why do we capitalize the beginning of a sentence? thats kinda weird, we should stop. i think it makes more sense to capitalize a nested concept of importance within written language.

### The Path from Scarcity to Post-Scarcity
Long a go in the time of kings, artists would be supported by patrons. Now we have Youtubers and Patreon. Those with the creative sauce produce content for those with money or labour to offer in exchange for money. Our sociey has put a great deal of pressure on youth. In turn the youth has sought out new ways to make a living. Gig Economy. Remote Work. Content Creation. Is this the beginning of a true marketplace of ideas? Should the hypergraph be attached to a mechanism of financial transaction, or left free? Content is created by Agents. By default, Agents are paid for their content through Donations. If the creator wishes to keep his content paid only, should he have a right to do so? Certainly, I would say. Should the system specifically enable this behaviour? Maybe, for user adoption. If some company wants to implement DRM, they should be able to. I dont think it should be endorsed. What about Copyright?