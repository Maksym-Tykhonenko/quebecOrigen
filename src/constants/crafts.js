const crafts = [
    {
      name: "Ceramics",
      materials: [
        {
            material: "Clay (various types: red, white, stoneware)",
            purchased: false
        },
        {
            material: "Water",
            purchased: false
        },
        {
            material: "Glaze",
            purchased: false
        }
      ],
      recipe: [
        "Shape the clay into the desired form (pot, plate, cup).",
        "Ensure the shape is even and smooth.",
        "Let the item dry to leather-hard stage (about 1-2 hours).",
        "Fire it in a kiln at 900°C for the bisque firing.",
        "Apply glaze and fire again at 1100°C."
      ],
      fact: 'Ceramics is one of the oldest forms of craftsmanship. In Quebec, traditional pottery dates back to Indigenous peoples who created dishes and ritual items from clay. Modern ceramicists use both traditional methods and modern techniques to create unique and functional artworks.',
      history: 'Since the early 17th century, pottery has been an integral part of daily life in Quebec. Early European settlers brought their traditions, blending them with local techniques. In the 19th century, renowned pottery factories emerged in Quebec, producing both utilitarian and decorative items.',
      significance: 'Ceramics in Quebec is not just a means of production but also a medium of self-expression. Ceramicists incorporate elements of culture and heritage into their work, creating a link between the past and the present. Ceramic items are often used in rituals and celebrations, highlighting their importance in social life.'
    },
    {
      name: "Weaving",
      materials: [
        {
            material: "Yarn (various colors and textures)",
            purchased: false
        },
        {
            material: "Loom",
            purchased: false
        },
        {
            material: "Scissors",
            purchased: false
        }
      ],
      recipe: [
        "Prepare the loom by setting up the warp.",
        "Wrap yarn vertically (warp).",
        "Use another yarn to create the pattern (weft), alternating colors.",
        "Continue to push and pull the yarn until the desired length is achieved.",
        "Finish by cutting the yarn and securing the edges."
      ],
      fact: 'Weaving in Quebec has deep roots and developed due to the influence of Indigenous peoples and European settlers. Fabrics were used not only for clothing but also for creating ritual objects and home textiles. Modern weavers combine traditional techniques with new approaches to create unique textile products.',
      history: 'With the beginning of colonization, weaving became a vital craft for settlers. The introduction of looms and spinning wheels led to the production of wool and linen fabrics. In the 19th century, weaving guilds were established, preserving traditional techniques and fostering community.',
      significance: 'Weaving is an essential aspect of Quebec`s cultural identity. The intricate patterns and designs often reflect the natural environment and cultural symbols. Weaving not only serves practical purposes but also acts as a medium for storytelling and preserving traditions.'
    },
    {
      name: "Wood Carving",
      materials: [
        {
            material: "Wood (e.g., basswood, pine)",
            purchased: false
        },
        {
            material: "Carving knives (gouges, chisels)",
            purchased: false
        },
        {
            material: "Sandpaper",
            purchased: false
        }
      ],
      recipe: [
        "Choose a piece of wood and draw the outline of the item.",
        "Use a carving knife to cut out the basic shapes.",
        "Then use finer tools for details and patterns.",
        "Sand the item with sandpaper to smooth the surfaces.",
        "Finish with a coating (oil or varnish) for protection."
      ],
      fact: 'Wood carving is a celebrated craft in Quebec, with artisans creating intricate sculptures, furniture, and decorative items. The craft has been passed down through generations, and many contemporary artists draw inspiration from traditional Indigenous and French techniques.',
      history: 'The history of wood carving in Quebec can be traced back to Indigenous peoples, who used the abundant local wood for tools, art, and ceremonial objects. With European colonization, wood carving evolved, incorporating new styles and methods. Today, it remains a vibrant part of Quebec`s artistic landscape.',
      significance: 'Wood carving holds cultural significance in Quebec, representing a connection to nature and the region`s history. The craft allows artisans to express their creativity while preserving cultural narratives through their work. Carved pieces often showcase stories, myths, and local traditions.'
    },
    {
      name: "Soap Making",
      materials: [
        {
            material: "Soap base (glycerin, vegetable)",
            purchased: false
        },
        {
            material: "Essential oils (lavender, mint))",
            purchased: false
        },
        {
            material: "Colorants",
            purchased: false
        },
        {
            material: "Soap molds",
            purchased: false
        },
      ],
      recipe: [
        "Heat the soap base until fully melted.",
        "Add essential oils and colorants, mixing well.",
        "Pour the mixture into molds and let cool.",
        "Once the soap hardens, remove it from the molds.",
        "Package or decorate as desired."
      ],
      fact: 'Soap making in Quebec combines traditional methods with modern techniques, emphasizing natural ingredients. Artisanal soaps are often crafted with local herbs, essential oils, and unique fragrances, making them popular among consumers.',
      history: 'The practice of soap making dates back to ancient civilizations, but in Quebec, it gained popularity during the colonial period. Early settlers used available resources, such as animal fats and plant-based oils, to create soap for personal hygiene and household use.',
      significance: 'Soap making is not only a practical craft but also an artistic endeavor. Artisans create visually appealing and fragrant soaps, transforming a simple necessity into a luxury item. The craft promotes sustainability and the use of local materials, aligning with contemporary values.'
    },
    {
      name: "Candle Making",
      materials: [
        {
            material: "Wax (paraffin, soy, beeswax)",
            purchased: false
        },
        {
            material: "Wicks",
            purchased: false
        },
        {
            material: "Essential oils (optional)",
            purchased: false
        },
        {
            material: "Candle molds",
            purchased: false
        },
      ],
      recipe: [
        "Heat the wax until fully melted.",
        "Add essential oils for fragrance (optional).",
        "Place the wick in the mold and carefully pour in the melted wax.",
        "Allow the candle to cool and harden.",
        "Trim the wick to the desired length and decorate as desired."
      ],
      fact: 'Candle making is a time-honored tradition in Quebec, with artisans crafting candles from beeswax, soy wax, and other natural materials. Handmade candles are often infused with essential oils, creating soothing fragrances for homes.',
      history: 'Candles have been used for centuries, with their production becoming essential for lighting in homes before the advent of electricity. In Quebec, candle making developed as a domestic craft, with families creating their own candles for practical use.',
      significance: 'Candles symbolize warmth, comfort, and celebration in Quebec culture. They are used in various rituals, ceremonies, and holidays, enhancing the ambiance of special occasions. Artisanal candle makers also contribute to the local economy, offering unique products that reflect Quebec`s craftsmanship.'
    },
    {
      name: "Jewelry Making",
      materials: [
        {
            material: "Beads (various shapes and colors)",
            purchased: false
        },
        {
            material: "Wire or string",
            purchased: false
        },
        {
            material: "Clasps",
            purchased: false
        },
      ],
      recipe: [
        "Select beads and create a design.",
        "String the beads onto wire or string as desired.",
        "Secure the ends using clasps to complete the piece.",
        "Check the fastening and make adjustments if necessary.",
        "Package the jewelry for gifting or personal use."
      ],
      fact: 'Jewelry making in Quebec is a blend of traditional techniques and contemporary design. Artisans use a variety of materials, including silver, gold, and semi-precious stones, to create unique pieces that often tell a story.',
      history: 'The art of jewelry making has ancient roots, with Indigenous peoples in Quebec crafting ornaments from natural materials. Over time, European influences introduced new styles and techniques, leading to a rich tradition of jewelry making that persists today.',
      significance: 'Jewelry holds cultural significance, often symbolizing heritage, identity, and personal stories. Artisans create pieces that reflect the beauty of Quebec`s landscapes and the diverse cultures that have influenced the region. Jewelry making is a form of artistic expression that continues to evolve.'
    },
    {
      name: "Paper Sculpture",
      materials: [
        {
            material: "Paper (various types: cardboard, colored)",
            purchased: false
        },
        {
            material: "Glue",
            purchased: false
        },
        {
            material: "Scissors",
            purchased: false
        },
      ],
      recipe: [
        "Draw and cut out the main shapes of the sculpture from paper.",
        "Glue the pieces together using glue.",
        "Add details and textures using additional paper pieces.",
        "Let the work dry so it becomes sturdy.",
        "Decorate or paint the sculpture as desired."
      ],
      fact: 'Paper sculpture is an innovative craft in Quebec, where artists create intricate designs and models using various types of paper. This craft allows for immense creativity and experimentation, resulting in unique art pieces.',
      history: 'Paper sculpture has gained popularity in recent decades, with artists exploring the possibilities of paper as a medium. Inspired by traditional origami and modern techniques, Quebec artisans have developed their unique styles and methods.',
      significance: 'Paper sculptures represent a fusion of art and sustainability, as artists often use recycled materials. This craft encourages creativity and provides an avenue for storytelling through visual art. It also highlights the versatility of paper as a medium for expression.'
    }
  ];
  
  export default crafts;
  