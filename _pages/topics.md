---
layout: page
title: "Topics — Dubai Time"
permalink: /topics/
description: "Browse all topic hubs on Dubai Time — from bus timings and UAE visas to banking, city guides, and shopping. Topically organised for quick navigation."
---

<section class="topics-index-section">
    <div class="topics-index-intro">
        <h1>Browse by Topic</h1>
        <p>Everything on Dubai Time is organised into topic hubs. Each hub groups related guides and articles so you can go deep on any subject that matters to you.</p>
    </div>
    <div class="topics-index-grid">
        {% for topic in site.topics %}
        {% assign topic_posts = "" | split: "" %}
        {% for post in site.posts %}
          {% assign has_match = false %}
          {% for cat in post.categories %}
            {% if topic.category_match contains cat %}
              {% assign has_match = true %}
            {% endif %}
          {% endfor %}
          {% if has_match %}
            {% assign topic_posts = topic_posts | push: post %}
          {% endif %}
        {% endfor %}
        <a href="{{ topic.url | relative_url }}" class="topic-index-card" id="topic-{{ topic.slug }}">
            <div class="topic-index-icon">
                {% if topic.slug == "bus-timings" %}
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="13" rx="2"/><path d="M3 8h18"/><path d="M8 3v5"/><path d="M16 3v5"/><circle cx="7.5" cy="19.5" r="1.5"/><circle cx="16.5" cy="19.5" r="1.5"/><path d="M7.5 18V16h9v2"/></svg>
                {% elsif topic.slug == "banking-finance" %}
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
                {% elsif topic.slug == "city-guides" %}
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                {% elsif topic.slug == "shopping-lifestyle" %}
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                {% elsif topic.slug == "uae-visa-id" %}
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M13 12h4"/><path d="M13 16h4"/><path d="M9 16H5"/></svg>
                {% else %}
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {% endif %}
            </div>
            <div class="topic-index-body">
                <strong class="topic-index-title">{{ topic.title }}</strong>
                <p class="topic-index-desc">{{ topic.description | truncate: 110 }}</p>
                <span class="topic-index-count">{{ topic_posts.size }} article{% unless topic_posts.size == 1 %}s{% endunless %}</span>
            </div>
        </a>
        {% endfor %}
    </div>
</section>
